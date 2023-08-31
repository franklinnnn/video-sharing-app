import { useAuthContext } from "@/context/AuthContext";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { UserProps } from "@/types";
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
import { useDocument } from "react-firebase-hooks/firestore";

interface FollowButtonProps {
  user: UserProps;
}

const FollowButton = ({ user }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");

  const { currentUser } = useCurrentUser();

  const getCurrentUsername = async () => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      await getDoc(userRef).then((doc) => {
        setCurrentUsername(doc.data()?.username);
      });
    }
  };

  const handleFollow = async () => {
    const followedUserRef = doc(db, "users", user.uid);
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);

      if (isFollowing) {
        const followingData = {
          following: {
            [user.uid]: deleteField(),
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
        await setDoc(doc(userRef, "following", user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          username: user.username,
          uid: user.uid,
        });
        await setDoc(doc(followedUserRef, "followers", currentUser.uid), {
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          username: currentUsername,
          uid: currentUser.uid,
        });
        console.log("followed user");
        setIsFollowing(true);
      }
    }
  };

  useEffect(() => {
    getCurrentUsername();
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);

      //   getDoc(doc(userRef, "following", userId)).then((doc) => {
      //     setIsFollowing(doc.exists());
      //   });
    }
  }, [user.uid]);
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
