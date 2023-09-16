"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { AiFillHeart } from "react-icons/ai";
import LoginModal from "../Modals/LoginModal";
import { useEffect, useState } from "react";
import {
  useCollectionData,
  useDocument,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { useCurrentUsername } from "@/hooks/useCurrentUsername";

interface LikePostButtonProps {
  postId: string;
  userInfo: Record<string, any>;
}

const LikePostButton = ({ postId, userInfo }: LikePostButtonProps) => {
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
