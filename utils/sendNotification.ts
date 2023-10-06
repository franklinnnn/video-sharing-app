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
