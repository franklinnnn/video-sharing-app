import { db } from "@/utils/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useNotifications = (currentUserId: string) => {
  const [data, setData] = useState<any[]>([]);

  const getNotifications = async () => {
    const notificationsCollection = collection(
      db,
      `/users/${currentUserId}/notifications`
    );
    const notificationsQuery = query(
      notificationsCollection,
      orderBy("timestamp", "desc")
    );
    const notificationsSnapshot = await getDocs(notificationsQuery);
    const notificationsList = notificationsSnapshot.docs.map((item) => {
      return {
        ...item,
        item,
      };
    });
    setData(notificationsList);

    console.log(notificationsList);

    useEffect(() => {
      try {
        getNotifications();
      } catch (error) {
        console.log(error);
      }
    }, [currentUserId]);
  };
  return { data };
};
