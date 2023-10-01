import { db } from "@/utils/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useNotifications = (currentUserId: string) => {
  const [data, setData] = useState([] as any);

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
    notificationsSnapshot.docs.map((item) => {
      console.log(data);
      setData(item.data());
    });

    console.log(data);

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
