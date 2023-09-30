"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import NotificationsItem from "./NotificationsItem";
import { useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationsFeed = () => {
  const { currentUser } = useCurrentUser();

  const notificationsQuery = query(
    collection(db, `users/${currentUser?.uid}/notifications`),
    orderBy("timestamp", "desc")
  );
  const [notifications] = useCollectionData(notificationsQuery);

  const { data } = useNotifications(currentUser.uid as string);

  console.log(data);

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
      {notifications?.map((notification) => (
        <div key={notification.notificationId}>
          <NotificationsItem
            key={notification.notificationId}
            notification={notification}
          />
        </div>
      ))}
    </section>
  );
};
export default NotificationsFeed;
