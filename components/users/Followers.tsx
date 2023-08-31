import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

interface FollowersProps {
  userId: string;
}

const Followers = ({ userId }: FollowersProps) => {
  const [followers, setFollowers] = useState<string[]>([]);

  useEffect(() => {
    if (userId) {
      const userRef = doc(db, "users", userId.toString());

      const followersRef = collection(userRef, "followers");
      onSnapshot(followersRef, (snapshot) => {
        const followerIds: string[] = [];
        snapshot.forEach((doc) => {
          followerIds.push(doc.id);
        });
        setFollowers(followerIds);
      });
    }
  }, [userId]);

  console.log(followers);

  return <div>Followers</div>;
};

export default Followers;
