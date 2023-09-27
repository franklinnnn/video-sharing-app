"use client";

import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const usePost = (postId: string) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const postRef = doc(db, "posts", postId);

  const getPost = async () => {
    setLoading(true);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {
      // console.log(postSnapshot.data());
      setData(postSnapshot.data());
    }
    setLoading(false);
  };

  useEffect(() => {
    try {
      getPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  // console.log(data);

  return { data, loading };
};
