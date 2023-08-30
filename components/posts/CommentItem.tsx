import Image from "next/image";
import React from "react";
import { BsHeart } from "react-icons/bs";

const CommentItem = () => {
  return (
    <div className="flex items-start gap-2 my-6">
      <Image
        src="/images/placeholder.png"
        alt="User profile photo"
        width={50}
        height={50}
        className="object-fit w-16 h-16 rounded-full"
      />
      <div className="text-sm">
        <div className="flex gap-4 items-center">
          <span className="font-semibold">username</span>{" "}
          <span className="text-xs">2 hours ago</span>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
          inventore id consequatur dolor officiis veniam minus error aspernatur
          sequi nemo.
        </p>

        <div className="flex gap-6 items-center mt-2">
          <div className="flex gap-2 items-center">
            <BsHeart /> <span>10</span>
          </div>
          <div>Reply</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
