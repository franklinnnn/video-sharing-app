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
} from "firebase/firestore";
import { AiFillHeart } from "react-icons/ai";
import LoginModal from "../Modals/LoginModal";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { LikePostButtonProps } from "@/types";
import { sendNotification } from "@/utils/index";

const LikePostButton = ({ postId, userId }: LikePostButtonProps) => {
  const { currentUser } = useCurrentUser();
  const [likedPost, setLikedPost] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleLikePost = async () => {
    const postRef = doc(db, "posts", postId);
    if (currentUser.uid) {
      if (likedPost) {
        await deleteDoc(doc(db, "posts", postId, "likes", currentUser.uid));
        await deleteDoc(
          doc(db, "users", currentUser.uid, "likedPosts", postId)
        );

        console.log("unliked post");
        setLikedPost(false);
      } else {
        await setDoc(doc(postRef, "likes", currentUser.uid), {
          displayName: currentUser.displayName,
          uid: currentUser.uid,
        });

        const postSnapshot = await getDoc(postRef);
        await setDoc(doc(db, "users", currentUser.uid, "likedPosts", postId), {
          caption: postSnapshot.data()?.caption,
          userInfo: {
            userId: postSnapshot.data()?.userInfo.userId,
            displayName: postSnapshot.data()?.userInfo.displayName,
            username: postSnapshot.data()?.userInfo.username,
            photoURL: postSnapshot.data()?.userInfo.photoURL,
          },
          video: postSnapshot.data()?.video,
          postId: postId,
          timestamp: serverTimestamp(),
        });
        if (currentUser.uid !== userId) {
          sendNotification(currentUser, userId, "like", postId);
        }

        console.log("liked post");
        setLikedPost(true);
      }
    } else {
      setOpenLogin(true);
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
          likedPost ? "text-red-500" : "text-main-dark"
        }`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full p-1 bg-primary/10 group-hover:bg-primary/20">
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
