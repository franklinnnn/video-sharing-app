import useCurrentUser from "@/hooks/useCurrentUser";
import { FollowButtonProps } from "@/types";
import { sendNotification } from "@/utils/index";
import { db } from "@/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const FollowButton = ({
  user,
  isFollowing,
  setIsFollowing,
  openModal,
}: FollowButtonProps) => {
  const { currentUser } = useCurrentUser();

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
          username: currentUser.username,
          uid: currentUser.uid,
        });

        sendNotification(currentUser, user.uid, "follow");

        await updateDoc(followedUserRef, { hasNotification: true });
        console.log("followed user");
        setIsFollowing(true);
      }
    }
  };

  useEffect(() => {
    handleFollowingCheck();
  }, [user.uid, following]);
  return (
    <button
      onClick={currentUser?.uid ? handleFollow : openModal}
      className={`py-1 px-6 object-fit border-2 rounded-md transition 
        ${
          isFollowing
            ? "bg-primary border-primary text-main-light font-semibold hover:bg-transparent hover:border-red-500 hover:text-red-500"
            : "border-primary/20 hover:bg-primary/10 dark:border-zinc-200/20 hover:dark:bg-zinc-200/10"
        }
        ${currentUser?.uid === user.uid ? "hidden" : "block"}
      `}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
