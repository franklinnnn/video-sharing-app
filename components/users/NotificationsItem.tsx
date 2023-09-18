import Image from "next/image";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";

interface NotificationsItemProps {
  notification: Record<string, any>;
}

const NotificationsItem = ({ notification }: NotificationsItemProps) => {
  const notificationData = () => {
    if (notification.type === "follow") {
      return (
        <div
          key={notification.notificationId}
          className="flex gap-6 items-start py-2 border-b-2 border-gray-1"
        >
          <BsFillPersonFill size={30} />
          <div className="flex gap-2 items-center">
            <Image
              src={notification.photoURL}
              height={40}
              width={40}
              alt="User profile photo"
              className="object-fit rounded-full"
            />
            <span className="font-bold hover:underline ml-2">
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
          className="flex gap-6 items-start py-2 border-b-2 border-gray-1"
        >
          <AiFillHeart size={30} />
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Image
                src={notification.photoURL}
                height={40}
                width={40}
                alt="User profile photo"
                className="object-fit rounded-full"
              />
              <span className="font-bold hover:underline ml-2">
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
          className="flex gap-6 items-start py-2 border-b-2 border-gray-1"
        >
          <FaComment size={30} />
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Image
                src={notification.photoURL}
                height={40}
                width={40}
                alt="User profile photo"
                className="object-fit rounded-full"
              />
              <span className="font-bold hover:underline ml-2">
                {notification.displayName}
              </span>
              commented on your post
            </div>
            <div className="mt-2 text-gray-2">
              <p>{notification.postData?.caption}</p>
              <p className="font-semibold text-primary-dark">
                {notification.comment}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };
  return <>{notificationData}</>;
};

export default NotificationsItem;
