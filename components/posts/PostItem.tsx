import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "@headlessui/react";
import { PostItemProps } from "@/types";
import { BsThreeDotsVertical, BsFillShareFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import LikePostButton from "../posts/LikePostButton";
import CommentButton from "../posts/CommentButton";
import DeletePostModal from "../Modals/DeletePostModal";
import Video from "./Video";
import useCurrentUser from "@/hooks/useCurrentUser";

const PostItem = ({ post }: PostItemProps) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  const goToPost = useCallback(() => {
    router.push(`/${post.userInfo.username}/videos/${post.postId}`);
  }, [router, post.postId, post.userInfo.username]);

  return (
    <div className="relative w-fit pb-6 my-2 border-b-2 border-primary/20 dark:border-zinc-800">
      <div className="absolute top-2 left-2 flex justify-start gap-2 z-10 text-xs sm:text-base">
        <div className="w-12 h-12">
          <Image
            src={post.userInfo.photoURL}
            alt="User profile photo"
            height={50}
            width={50}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col text-white">
          <Link
            href={post.userInfo.username}
            className="text-xl font-semibold hover:underline"
          >
            {post.userInfo.displayName}
          </Link>
          <span onClick={goToPost} className="hover:cursor-pointer">
            {post.caption}
          </span>
        </div>
      </div>

      <Video video={post.video} />

      <div className="relative flex justify-between items-center py-2">
        <div className="flex flex-row gap-4">
          <LikePostButton postId={post.postId} userId={post.userInfo?.userId} />
          <CommentButton onClick={goToPost} postId={post.postId} />
        </div>

        <Menu>
          <Menu.Button>
            <BsThreeDotsVertical />
          </Menu.Button>
          <div className="absolute top-10 right-1 z-10">
            <Menu.Items>
              <div className="flex flex-col justify-center bg-main-light rounded-md border-2 border-primary/10 dark:bg-main-dark dark:border-zinc-800 ">
                <Menu.Item>
                  <button className="flex gap-2 items-center py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10">
                    <BsFillShareFill /> Share
                  </button>
                </Menu.Item>
                {currentUser?.uid === post.userInfo.userId ? (
                  <Menu.Item>
                    <button
                      className="flex gap-2 items-center py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10"
                      onClick={() => setOpenDeletePostModal(true)}
                    >
                      <AiFillDelete />
                      Delete
                    </button>
                  </Menu.Item>
                ) : null}
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
