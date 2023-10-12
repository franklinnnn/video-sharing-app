"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import NotificationsItem from "./NotificationsItem";
import { useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationsFeed = () => {
  const { currentUser } = useCurrentUser();
  const { data: notifications } = useNotifications(currentUser.uid, 500);

  const readNotifications = async () => {
    if (currentUser.uid) {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.data()) {
        await updateDoc(userRef, { hasNotification: false });
        console.log("read notifications");
      }
    }
  };

  useEffect(() => {
    readNotifications();
  });

  return (
    <section>
      {notifications?.map((notification: Record<string, any>) => (
        <NotificationsItem
          key={notification.notificationId}
          notification={notification}
        />
      ))}
    </section>
  );
};
export default NotificationsFeed;
