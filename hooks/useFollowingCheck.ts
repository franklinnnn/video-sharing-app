"use client";

import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const useFollowingCheck = (userId: string) => {
  const { currentUser } = useCurrentUser();
  const [isFollowing, setIsFollowing] = useState(true);

  const getFollowingUsers = async () => {
    const followingQuery = query(
      collection(db, `/users/${currentUser?.uid}/follwing`)
    );
    const followingSnapshot = await getDocs(followingQuery);
    followingSnapshot.forEach((followingUser) => {
      if (followingUser.data()?.uid === userId) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    });
  };

  useEffect(() => {
    getFollowingUsers();
  }, [userId]);

  console.log(isFollowing);

  return { isFollowing };
};
