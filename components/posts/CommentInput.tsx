"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { CommentInputProps } from "@/types";
import { sendNotification } from "@/utils/index";
import { db } from "@/utils/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentInput = ({ postId, postUserId }: CommentInputProps) => {
  const [comment, setComment] = useState("");

  const { currentUser } = useCurrentUser();

  const handlePostComment = async () => {
    try {
      const commentId = uuid();
      const postRef = doc(db, "posts", postId);
      if (currentUser) {
        await setDoc(doc(postRef, "comments", commentId), {
          comment: comment,
          timestamp: serverTimestamp(),
          commentId: commentId,
          userInfo: {
            userId: currentUser.uid,
            displayName: currentUser.displayName,
            username: currentUser.username,
            photoURL: currentUser.photoURL,
          },
        });
        if (currentUser.uid !== postUserId) {
          sendNotification(currentUser, postUserId, "comment", postId, comment);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setComment("");
    toast.success("Comment posted 👍");
  };

  return (
    <div className="fixed bottom-0 right-0 flex gap-2 justify-around items-center w-[40%] p-4 border-t-2 border-primary/20 dark:border-zinc-800 z-10">
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="text-lg w-full outline-none px-2 py-1 border-b-2 border-primary/20 focus:border-primary dark:bg-main-dark dark:border-zinc-800 focus:dark:border-zinc-200 transition"
      />
      <button
        onClick={handlePostComment}
        disabled={!comment}
        className={`rounded-md px-3 py-2 ${
          !comment
            ? "bg-primary/30 dark:bg-zinc-800"
            : "bg-primary hover:bg-primary/80"
        } text-main-light font-semibold transition`}
      >
        Post
      </button>
    </div>
  );
};

export default CommentInput;
