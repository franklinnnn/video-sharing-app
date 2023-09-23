import useCurrentUser from "@/hooks/useCurrentUser";
import { NotificationsItemProps } from "@/types";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";

const NotificationsItem = ({ notification }: NotificationsItemProps) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const goToUser = useCallback(() => {
    router.push(`/${notification.username}`);
  }, [notification.username]);

  const goToPost = useCallback(async () => {
    if (currentUser) {
      const currentUsernameRef = doc(db, "users", currentUser?.uid);
      const currentUsernameSnapshot = await getDoc(currentUsernameRef);

      router.push(
        `/${currentUsernameSnapshot.data()?.username}/videos/${
          notification.postId
        }`
      );
    }
  }, [currentUser, notification.postId]);

  const getRelativeTime = () => {
    const date = new Date();
    const timestamp = date.getTime();
    const seconds = Math.floor(timestamp / 1000);
    const difference = seconds - notification.timestamp?.seconds;
    let output = "";

    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor(difference / 3600)} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor(difference / 86400)} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor(difference / 2620800)} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor(difference / 31449600)} years ago`;
    }
    return output;
  };

  if (notification.type === "follow") {
    return (
      <div
        key={notification.notificationId}
        onClick={goToUser}
        className="flex gap-6 items-start py-4 border-b-2 border-gray-1 hover:cursor-pointer"
      >
        <div className="flex justify-center w-8 text-primary">
          <BsFillPersonFill size={30} />
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={notification.photoURL}
            height={40}
            width={40}
            alt="User profile photo"
            className="object-fit rounded-full"
          />
          <span
            onClick={goToUser}
            className="font-bold hover:underline hover:cursor-pointer ml-2"
          >
            {notification.displayName}
          </span>
          has followed you
        </div>
      </div>
    );
  }
  if (notification.type === "like") {
    return (
      <div
        key={notification.notificationId}
        onClick={goToPost}
        className="flex gap-6 items-start py-2 border-b-2 border-gray-1 hover:cursor-pointer"
      >
        <div className="flex justify-center w-8 text-red-500">
          <AiFillHeart size={27} />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Image
              src={notification.photoURL}
              height={40}
              width={40}
              alt="User profile photo"
              className="object-fit rounded-full"
            />
            <span
              onClick={goToUser}
              className="font-bold hover:underline hover:cursor-pointer ml-2"
            >
              {notification.displayName}
            </span>
            liked your post
          </div>
          <div className="mt-2 text-gray-2">
            {notification.postData?.caption}
          </div>
        </div>
      </div>
    );
  }
  if (notification.type === "comment") {
    return (
      <div
        key={notification.notificationId}
        onClick={goToPost}
        className="flex gap-6 items-start py-2 border-b-2 border-gray-1 hover:cursor-pointer"
      >
        <div className="flex justify-center w-8 text-primary-light">
          <FaComment size={23} />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Image
              src={notification.photoURL}
              height={40}
              width={40}
              alt="User profile photo"
              className="object-fit rounded-full"
            />
            <span
              onClick={goToUser}
              className="font-bold hover:underline hover:cursor-pointer ml-2 z-10"
            >
              {notification.displayName}
            </span>
            commented on your post
            <span className="text-xs text-gray-2">• {getRelativeTime()}</span>
          </div>
          <div className="mt-2 text-gray-2">
            <p className="text-sm">{notification.postData?.caption}</p>
            <p className="font-semibold text-primary-dark ml-4 mt-2 text-lg">
              {notification.comment}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default NotificationsItem;
