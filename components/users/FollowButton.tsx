import useCurrentUser from "@/hooks/useCurrentUser";
import { FollowButtonProps, UserProps } from "@/types";
import { db } from "@/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const FollowButton = ({
  user,
  isFollowing,
  setIsFollowing,
}: FollowButtonProps) => {
  const { currentUser } = useCurrentUser();
  const [currentUsername, setCurrentUsername] = useState("");
  const [previouslyFollowed, setPreviouslyFollowed] = useState(false);

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
        await setDoc(doc(followedUserRef, "notifications", user.uid), {
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
          type: "follow",
          timestamp: serverTimestamp(),
        });
        await updateDoc(doc(db, "users", user.uid), {
          hasNotification: true,
        });

        console.log("followed user");
        setIsFollowing(true);
      }
    }
  };

  useEffect(() => {
    getCurrentUsername();
    handleFollowingCheck();
  }, [user.uid]);
  return (
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
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
