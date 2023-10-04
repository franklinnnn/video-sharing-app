import { db } from "@/utils/firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

export const getRelativeTime = (timestamp: number) => {
  const date = new Date();
  const time = date.getTime();
  const seconds = Math.floor(time / 1000);
  const difference = seconds - timestamp;
  let output = "";

  if (difference < 60) {
    // Less than a minute has passed:
    output = `just now`;
  } else if (difference < 120) {
    output = `${difference} seconds ago`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    output = `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    output = `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    output = `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    output = `${Math.floor(difference / 2620800)} months ago`;
  } else {
    // More than a year has passed:
    output = `${Math.floor(difference / 31449600)} years ago`;
  }
  return output;
};

export const sendNotification = async (
  currentUser: Record<string, any>,
  recipientUserId: string,
  notificationType: string,
  postId?: string,
  comment?: string
) => {
  const recipientUserRef = doc(db, "users", recipientUserId);
  const notificationId = uuid();
  const notificationRef = doc(
    recipientUserRef,
    "notifications",
    notificationId
  );
  const notificationSnapshot = await getDoc(notificationRef);

  if (notificationSnapshot.data()) {
    await updateDoc(notificationRef, { isRead: true });
  } else if (postId) {
    const postRef = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postRef);
    const postCaption = postSnapshot.data()?.caption;
    await setDoc(notificationRef, {
      displayName: currentUser.displayName,
      username: currentUser.username,
      photoURL: currentUser.photoURL,
      type: notificationType,
      isRead: false,
      postId: postId,
      postData: {
        caption: postCaption,
      },
      timestamp: serverTimestamp(),
      notificationId: notificationId,
    });
    if (comment) {
      await updateDoc(notificationRef, { comment: comment });
    }
  } else {
    await setDoc(notificationRef, {
      displayName: currentUser.displayName,
      username: currentUser.username,
      photoURL: currentUser.photoURL,
      type: notificationType,
      isRead: false,
      timestamp: serverTimestamp(),
      notificationId: notificationId,
    });
  }
  await updateDoc(recipientUserRef, { hasNotification: true });
  console.log("notification sent");
};

export const handleCopyUrl = (pathname: string) => {
  const url = `localhost:3000${pathname}`;
  navigator.clipboard.writeText(url);
  toast.success("Copied URL ✔️");
};
