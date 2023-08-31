import { useAuthContext } from "@/context/AuthContext";
import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import {
  FieldValue,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

interface FollowButtonProps {
  userId: string;
}

const FollowButton = ({ userId }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const firebase = useAuthContext();

  const { currentUser } = useCurrentUser();

  const handleFollow = async () => {
    const followedUserRef = doc(db, "users", userId);
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);

      if (isFollowing) {
        const followingData = {
          following: {
            [userId]: deleteField(),
          },
        };
        await updateDoc(userRef, followingData);

        const followerData = {
          followers: {
            [currentUser.uid]: deleteField(),
          },
        };
        await updateDoc(followedUserRef, followerData);

        console.log("unfollowed user");
        setIsFollowing(false);
      } else {
        await setDoc(doc(userRef, "following", userId), {
          userId: userId,
        });
        await setDoc(doc(followedUserRef, " followers", currentUser.uid), {
          userId: currentUser.uid,
        });
        console.log("followed user");
        setIsFollowing(true);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);

      //   getDoc(doc(userRef, "following", userId)).then((doc) => {
      //     setIsFollowing(doc.exists());
      //   });
    }
  }, [userId]);
  return (
    <button
      onClick={handleFollow}
      className={`py-1 px-6 object-fit border-2  rounded-md  transition ${
        isFollowing
          ? "bg-fuchsia-500 border-fuchsia-500 hover:bg-transparent hover:border-red-500"
          : "border-zinc-200 hover:bg-zinc-700/60"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
