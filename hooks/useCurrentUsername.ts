"use client";

import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCurrentUsername = async (userId: string) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const userRef = doc(db, "users", userId);

  const getUsername = async () => {
    setLoading(true);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      setData(userSnapshot.data());
      console.log(userSnapshot.data()?.username);
    }
    setLoading(false);
  };

  useEffect(() => {
    try {
      getUsername();
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  console.log(data);

  return { data, loading };
};
