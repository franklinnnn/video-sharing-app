import { usePost } from "@/hooks/usePost";
import { PostItemProps } from "@/types";
import React from "react";

interface PostVideoProps {
  isOpen: boolean;
  closeModal: () => void;
  postId: string;
}

const PostVideo = ({ isOpen, closeModal, postId }: PostVideoProps) => {
  const data = usePost(postId);

  console.log(data);
  return (
    <div className="w-full h-full bg-blue-40 p-16">
      <button className="p-4 bg-fuchsia-500" onClick={closeModal}>
        PostVideo
      </button>
    </div>
  );
};

export default PostVideo;
