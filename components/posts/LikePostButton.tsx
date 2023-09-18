"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { AiFillHeart } from "react-icons/ai";
import LoginModal from "../Modals/LoginModal";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { v4 as uuid } from "uuid";

interface LikePostButtonProps {
  postId: string;
  userId: string;
}

const LikePostButton = ({ postId, userId }: LikePostButtonProps) => {
  const { currentUser } = useCurrentUser();

  const [likedPost, setLikedPost] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);

  const handleLikePost = async () => {
    const postRef = doc(db, "posts", postId);
    if (currentUser) {
      if (likedPost) {
        await deleteDoc(doc(db, "posts", postId, "likes", currentUser.uid));

        console.log("unliked post");
        setLikedPost(false);
      } else {
        await setDoc(doc(postRef, "likes", currentUser.uid), {
          displayName: currentUser.displayName,
          uid: currentUser.uid,
        });
        handleNotification();

        console.log("liked post");
        setLikedPost(true);
      }
    } else {
      setOpenLogin(true);
    }
  };

  const handleNotification = async () => {
    const recipientUserRef = doc(db, "users", userId);
    if (currentUser) {
      const notificationId = uuid();
      const notificationRef = doc(
        recipientUserRef,
        "notifications",
        notificationId
      );
      const notificationSnapshot = await getDoc(notificationRef);
      if (notificationSnapshot.data()) {
        await updateDoc(notificationRef, { isRead: true });
        console.log(
          "You liked this post before, notification will not be sent to recipient user"
        );
      } else {
        const postRef = doc(db, "posts", postId);
        const postSnapshot = await getDoc(postRef);

        await setDoc(doc(recipientUserRef, "notifications", notificationId), {
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          type: "like",
          isRead: false,
          postId: postId,
          postData: {
            caption: postSnapshot.data()?.caption,
          },
          timestamp: serverTimestamp(),
        });
        console.log("notification sent successfully");
      }
    }
  };

  const likesQuery = query(collection(db, `posts/${postId}/likes`));
  const [likes] = useCollectionData(likesQuery);

  useEffect(() => {
    likes?.map((like) => {
      if (like.uid === currentUser?.uid) {
        setLikedPost(true);
      } else {
        setLikedPost(false);
      }
    });
  });

  return (
    <>
      <button
        onClick={handleLikePost}
        className={`group flex items-center justify-center gap-2 hover:text-red-500 transition ${
          likedPost ? "text-red-500" : "text-zinc-800"
        }`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full p-1 bg-gray-1 group-hover:bg-gray-2">
          <AiFillHeart size={20} />
        </div>
        <span>{likes?.length}</span>
      </button>

      <LoginModal
        isOpen={openLogin}
        closeModal={() => setOpenLogin(false)}
        href="/"
      />
    </>
  );
};

export default LikePostButton;
