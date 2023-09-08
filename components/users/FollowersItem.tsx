import React, { useEffect, useState } from "react";
import { UserProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FollowButton from "../FollowButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface FollowersItemProps {
  user: UserProps;
}

const FollowersItem = ({ user }: FollowersItemProps) => {
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

  const q = query(collection(db, `users/${currentUser?.uid}/following`));
  const [following] = useCollectionData(q);

  const handleFollowingCheck = () => {
    following?.map((followingUser) => {
      if (followingUser.uid === user.uid) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    });
  };

  const handleFollow = async () => {
    const followedUserRef = doc(db, "users", user.uid);
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);

      if (isFollowing) {
        await deleteDoc(
          doc(db, "users", currentUser.uid, "following", user.uid)
        );
        await deleteDoc(
          doc(db, "users", user.uid, "followers", currentUser.uid)
        );

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
    handleFollowingCheck();
  }, [user]);

  return (
    <Link
      href={user.username}
      className="flex flex-row gap-4 items-center justify-between p-2 my-2 hover:cursor-pointer"
    >
      <div className="flex gap-4 items-center justify-start">
        <Image
          src={user.photoURL}
          alt={user.displayName}
          height={45}
          width={45}
          className="object-fit rounded-full"
        />
        <div>
          <p className="text-xl font-semibold hover:underline">
            {user.displayName}
          </p>
          <p className="text-md text-zinc-600">@{user.username}</p>
        </div>
      </div>
      {/* <FollowButton
        user={user}
        isFollowing={isFollowing}
        setIsFollowing={setIsFollowing}
      /> */}

      {/* 
      <button
        onClick={handleFollow}
        className={`py-1 px-6 object-fit border-2  rounded-md  transition 
        ${
          isFollowing
            ? "bg-fuchsia-500 border-fuchsia-500 hover:bg-transparent hover:border-red-500"
            : "border-zinc-200 hover:bg-zinc-700/60"
        }
        ${currentUser?.uid === user.uid ? "hidden" : "block"}
      `}
      >
        {isFollowing ? "Follow" : "Unfollow"}
      </button> */}
    </Link>
  );
};

export default FollowersItem;
