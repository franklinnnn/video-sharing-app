import useCurrentUser from "@/hooks/useCurrentUser";
import { useCurrentUsername } from "@/hooks/useCurrentUsername";
import { db } from "@/utils/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface CommentFeedProps {
  postId: string;
}

const CommentInput = ({ postId }: CommentFeedProps) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [comment, setComment] = useState("");

  const { currentUser } = useCurrentUser();

  const getCurrentUsername = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      await getDoc(userRef).then((doc) => {
        setCurrentUsername(doc.data()?.username);
      });
    }
  };

  useEffect(() => {
    getCurrentUsername();
  }, [currentUser]);

  const handlePostComment = async () => {
    try {
      const postRef = doc(db, "posts", postId);
      if (currentUser) {
        await setDoc(doc(postRef, "comments", uuid()), {
          comment: comment,
          timestamp: serverTimestamp(),
          userInfo: {
            userId: currentUser.uid,
            displayName: currentUser.displayName,
            username: currentUsername,
            photoURL: currentUser.photoURL,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    setComment("");
    alert(`comment: "${comment}" posted successfully`);
  };

  return (
    <div className="fixed bottom-0 right-0 flex gap-2 justify-around items-center w-[35%] p-4 bg-zinc-900 z-10">
      <input
        type="text"
        placeholder="Add comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="text-lg w-full bg-zinc-800 outline-none px-2 py-1"
      />
      <button
        onClick={handlePostComment}
        className="border-2 border-zinc-600 rounded-md px-2 py-1"
      >
        Post
      </button>
    </div>
  );
};

export default CommentInput;
