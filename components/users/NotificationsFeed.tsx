"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import { collection, query } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const NotificationsFeed = () => {
  const { currentUser } = useCurrentUser();

  const notificationsQuery = query(
    collection(db, `users/${currentUser?.uid}/notifications`)
  );
  const [notifications] = useCollectionData(notificationsQuery);

  return (
    <div>
      {notifications?.map((notification) => (
        <div key={notification.timestamp}>
          <Image
            src={notification.photoURL || "/images/placeholder.png"}
            alt="User profile photo"
            width={80}
            height={80}
            className="object-fit w-28 h-28 rounded-full"
          />
          {notification.displayName}
        </div>
      ))}
    </div>
  );
};
export default NotificationsFeed;
