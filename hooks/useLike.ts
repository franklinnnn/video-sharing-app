import { db } from "@/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

export const useLike = (
  currentUser: Record<string, any>,
  currentUsername: string,
  recipientUser: Record<string, any>,
  post: Record<string, any>,
  liked: boolean
) => {
  try {
    let docToLike = doc(db, "posts", post.postId, "likes", currentUser.uid);
    let docToNotify = doc(
      collection(
        db,
        "users",
        recipientUser.uid,
        "notifications",
        `${currentUser.uid}_${post.postId}`
      )
    );
    if (liked) {
      deleteDoc(docToLike);
      deleteDoc(docToNotify);
    } else {
      setDoc(docToLike, { currentUser, post });

      if (currentUser.uid !== recipientUser.uid) {
        const notificationData = {
          username: currentUsername,
          recipientUserId: recipientUser.uid,
          type: "like",
          postId: post.postId,
          postData: post,
          timestamp: serverTimestamp(),
          isRead: false,
        };
        setDoc(docToNotify, notificationData);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
