"use client";

import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUser = (username?: string, userId?: string) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const getUserByUsername = async () => {
    const userCollection = collection(db, "users");
    const userQuery = query(userCollection, where("username", "==", username));
    const userSnapshot = await getDocs(userQuery);
    userSnapshot.forEach((doc) => {
      // console.log(doc.data());
      setData(doc.data());
    });
  };

  const getUserByUserId = async () => {
    const userCollection = collection(db, "users");
    const userQuery = query(userCollection, where("uid", "==", userId));
    const userSnapshot = await getDocs(userQuery);
    userSnapshot.forEach((doc) => {
      // console.log(doc.data());
      setData(doc.data());
    });
  };

  useEffect(() => {
    try {
      setLoading(true);
      if (username) {
        getUserByUsername();
      }
      if (userId) {
        getUserByUserId();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [username, userId]);

  // console.log(data);

  return { data, loading };
};
