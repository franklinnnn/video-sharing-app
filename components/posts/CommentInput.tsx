"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface CommentFeedProps {
  postId: string;
  postUserId: string;
}

const CommentInput = ({ postId, postUserId }: CommentFeedProps) => {
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
            username: currentUsername,
            photoURL: currentUser.photoURL,
          },
        });
        handleNotification();
      }
    } catch (error) {
      console.log(error);
    }
    setComment("");
    alert(`comment: "${comment}" posted successfully`);
  };

  const handleNotification = async () => {
    const recipientUserRef = doc(db, "users", postUserId);
    if (currentUser) {
      const notificationId = uuid();
      const notificationRef = doc(
        db,
        "users",
        postUserId,
        "notifications",
        notificationId
      );
      const notificationSnapshot = await getDoc(notificationRef);
      if (notificationSnapshot.data()?.notificationId === notificationId) {
        console.log(notificationSnapshot.data());
        await updateDoc(notificationRef, { isRead: true });
      } else {
        const postRef = doc(db, "posts", postId);
        const postSnapshot = await getDoc(postRef);

        await setDoc(doc(recipientUserRef, "notifications", notificationId), {
          displayName: currentUser.displayName,
          username: currentUsername,
          photoURL: currentUser.photoURL,
          type: "comment",
          isRead: false,
          postId: postId,
          postData: {
            caption: postSnapshot.data()?.caption,
          },
          comment: comment,
          timestamp: serverTimestamp(),
        });

        await updateDoc(recipientUserRef, { hasNotification: true });
      }
    }
  };

  return (
    <div className="fixed bottom-0 right-0 flex gap-2 justify-around items-center w-[35%] p-4 bg-gray-1 z-10">
      <input
        type="text"
        placeholder="Add comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="text-lg w-full bg-white outline-none px-2 py-1 rounded-md"
      />
      <button
        onClick={handlePostComment}
        disabled={!comment}
        className="border-2 border-primary rounded-md px-2 py-1 hover:bg-primary hover:text-white transition"
      >
        Post
      </button>
    </div>
  );
};

export default CommentInput;
