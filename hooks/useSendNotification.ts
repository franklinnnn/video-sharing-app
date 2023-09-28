import { db } from "@/utils/firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export const useSendNotification = async (
  currentUser: Record<string, any>,
  recipientUserId: string,
  notificationType: string,
  postId?: string,
  comment?: string
) => {
  const [postCaption, setPostCaption] = useState("");

  const recipientUserRef = doc(db, "users", recipientUserId);
  const notificationId = uuid();
  const notificationRef = doc(
    recipientUserRef,
    "notifications",
    notificationId
  );
  const notificationSnapshot = await getDoc(notificationRef);

  if (postId) {
    const postRef = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postRef);
    setPostCaption(postSnapshot.data()?.caption);
  }

  if (notificationSnapshot.data()) {
    await updateDoc(notificationRef, { isRead: true });
  } else if (postId) {
    const postRef = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postRef);
    await setDoc(notificationRef, {
      displayName: currentUser.displayName,
      username: currentUser.username,
      photoUrl: currentUser.photoURL,
      type: notificationType,
      isRead: false,
      postId: postId,
      postData: {
        caption: postSnapshot.data()?.caption,
      },
      timestamp: serverTimestamp(),
    });
    if (comment) {
      await updateDoc(notificationRef, { comment: comment });
    }
  } else {
    await setDoc(notificationRef, {
      displayName: currentUser.displayName,
      username: currentUser.username,
      photoUrl: currentUser.photoURL,
      type: notificationType,
      isRead: false,
      timestamp: serverTimestamp(),
    });
  }
  await updateDoc(recipientUserRef, { hasNotification: true });
  console.log("notification sent");
};
