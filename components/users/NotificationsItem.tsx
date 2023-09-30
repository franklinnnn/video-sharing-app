import useCurrentUser from "@/hooks/useCurrentUser";
import { NotificationsItemProps } from "@/types";
import { getRelativeTime } from "@/utils/index";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
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
    router.push(`/${currentUser.username}/videos/${notification.postId}`);
  }, [currentUser, notification.postId]);

  if (notification.type === "follow") {
    return (
      <div
        key={notification.notificationId}
        onClick={goToUser}
        className="flex gap-6 items-start py-4 border-b-2 border-primary/20 hover:cursor-pointer"
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
        className="flex gap-6 items-start py-2 border-b-2 border-primary/20 hover:cursor-pointer"
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
        className="flex gap-6 items-start py-2 border-b-2 border-primary/20 hover:cursor-pointer"
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
            <span className="text-xs text-gray-2">
              • {getRelativeTime(notification.timestamp)}
            </span>
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
