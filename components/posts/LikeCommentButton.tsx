"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import { collection, deleteDoc, doc, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import LoginModal from "../Modals/LoginModal";
import { LikeCommentButtonProps } from "@/types";

const LikeCommentButton = ({ postId, commentId }: LikeCommentButtonProps) => {
  const { currentUser } = useCurrentUser();
  const [likedComment, setLikedComment] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleLikeComment = async () => {
    const commentRef = doc(db, "posts", postId, "comments", commentId);

    if (currentUser) {
      if (likedComment) {
        await deleteDoc(
          doc(
            db,
            "posts",
            postId,
            "comments",
            commentId,
            "likes",
            currentUser.uid
          )
        );
        console.log("unliked comment");
        setLikedComment((current) => !current);
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            postId,
            "comments",
            commentId,
            "likes",
            currentUser.uid
          ),
          {
            displayName: currentUser.displayName,
            uid: currentUser.uid,
          }
        );

        console.log("liked comment");
        setLikedComment((current) => !current);
      }
    } else {
      setOpenLogin(true);
    }
  };

  const likesQuery = query(
    collection(db, `posts/${postId}/comments/${commentId}/likes`)
  );
  const [likes] = useCollectionData(likesQuery);

  useEffect(() => {
    likes?.map((like) => {
      if (like.uid === currentUser?.uid) {
        setLikedComment(true);
      } else setLikedComment(false);
    });
  });

  return (
    <>
      <button
        onClick={handleLikeComment}
        className={`flex gap-2 items-center justify-center hover:text-red-500 transition ${
          likedComment ? "text-red-500" : "text-zinc-700"
        }`}
      >
        {likedComment ? (
          <AiFillHeart className="text-red-500" />
        ) : (
          <AiOutlineHeart />
        )}
        <span className="text-xs">{likes?.length}</span>
      </button>

      <LoginModal
        isOpen={openLogin}
        closeModal={() => setOpenLogin(false)}
        href="/"
      />
    </>
  );
};

export default LikeCommentButton;
