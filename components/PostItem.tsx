"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { BsThreeDotsVertical, BsFillShareFill } from "react-icons/bs";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import DeletePostModal from "./Modals/DeletePostModal";
import { PostItemProps } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

const PostItem = ({ post }: PostItemProps) => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);

  const goToPost = useCallback(() => {
    router.push(`/${post.userInfo.username}/videos/${post.postId}`);
  }, [router, post.postId, post.userInfo.username]);

  return (
    <div className="relative w-fit pb-6 my-2 border-b-2 border-zinc-700">
      <div className="absolute top-2 left-2 flex justify-start gap-2 z-10">
        <Image
          src={post.userInfo.photoURL}
          alt="User profile photo"
          height={50}
          width={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <Link
            href={post.userInfo.username}
            className="text-xl font-semibold hover:underline"
          >
            {post.userInfo.displayName}
          </Link>
          <span>{post.caption}</span>
        </div>
      </div>
      <video
        controls
        muted
        className="h-[60vh] rounded-md aspect-[9/16] bg-black/20 focus:outline-none"
      >
        <source src={post.video} type="video/mp4" />
      </video>

      <div className="relative flex justify-between  items-center py-2">
        <div className="flex flex-row gap-2">
          <button className="flex items-center justify-center w-10 h-10 rounded-full p-2 bg-zinc-700 hover:bg-zinc-700/60 transition">
            <AiFillHeart size={24} />
          </button>
          <button
            onClick={goToPost}
            className="flex items-center justify-center w-10 h-10 rounded-full p-2 bg-zinc-700 hover:bg-zinc-700/60 transition"
          >
            <FaComment size={24} />
          </button>
        </div>

        <Menu>
          <Menu.Button>
            <BsThreeDotsVertical />
          </Menu.Button>
          <div className="absolute top-10 right-1 z-10">
            <Menu.Items>
              <div className="flex flex-col gap-2 bg-zinc-700 px-1 py-2 rounded-md ">
                <Menu.Item>
                  <button className="flex gap-2 items-center p-1 rounded-sm hover:bg-zinc-800/20">
                    {" "}
                    <BsFillShareFill /> Share
                  </button>
                </Menu.Item>
                {currentUser?.uid === post.userInfo.userId ? (
                  <Menu.Item>
                    <button
                      className="flex gap-2 items-center p-1 rounded-sm hover:bg-zinc-800/20"
                      onClick={() => setOpenDeletePostModal(true)}
                    >
                      <AiFillDelete />
                      Delete
                    </button>
                  </Menu.Item>
                ) : (
                  <></>
                )}
              </div>
            </Menu.Items>
          </div>
        </Menu>
      </div>

      <DeletePostModal
        isOpen={openDeletePostModal}
        closeModal={() => setOpenDeletePostModal(false)}
        postId={post.postId}
      />
    </div>
  );
};

export default PostItem;
