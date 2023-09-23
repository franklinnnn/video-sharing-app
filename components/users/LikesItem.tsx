import { LikesItemProps } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

const LikesItem = ({ item }: LikesItemProps) => {
  const router = useRouter();

  const goToPost = () => {
    router.push(`/${item.userInfo.username}/videos/${item.postId}`);
  };

  const handleOnMouseOver = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.currentTarget.play();
  };

  const handleOnMouseOut = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.currentTarget.currentTime = 0;
    event.currentTarget.pause();
  };

  return (
    <div
      key={item.postId}
      onClick={goToPost}
      className="my-4 pb-6 border-b-2 border-gray-2 sm:border-transparent hover:cursor-pointer"
    >
      <video
        muted
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
        className="rounded-md w-full aspect-[9/16] bg-black/20 focus:outline-none object-cover"
      >
        <source src={item.video} type="video/mp4" />
      </video>
      <p className="truncate">{item.caption}</p>
    </div>
  );
};

export default LikesItem;
