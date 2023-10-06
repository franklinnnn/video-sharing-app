import { delay } from "@/utils/index";
import { db } from "@/utils/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useNotifications = (currentUserId: string, time: number) => {
  const [data, setData] = useState([] as any);

  let docs: any[] = [];
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
    notificationsSnapshot.forEach((item) => {
      docs.push(item.data());
    });
    await delay(time);
    setData(docs);
  };

  useEffect(() => {
    try {
      getNotifications();
    } catch (error) {
      console.log(error);
    }
  }, [currentUserId]);
  return { data };
};
