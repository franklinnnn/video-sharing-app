import Image from "next/image";
import Link from "next/link";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
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

const PostItem = ({ post }: PostItemProps) => {
  // const currentUser = useCurrentUser();
  const [currentUser] = useAuthState(auth);
  const router = useRouter();
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  const goToPost = useCallback(() => {
    router.push(`/${post.userInfo.username}/videos/${post.postId}`);
  }, [router, post.postId, post.userInfo.username]);

  return (
    <div className="relative w-fit pb-6 my-2 border-b-2 border-gray-1">
      <div className="absolute top-2 left-2 flex justify-start gap-2 z-10 ">
        <Image
          src={post.userInfo.photoURL}
          alt="User profile photo"
          height={50}
          width={50}
          className="rounded-full"
        />
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

      <div className="relative flex justify-between  items-center py-2">
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
              <div className="flex flex-col gap-2 bg-gray-1 px-1 py-2 rounded-md ">
                <Menu.Item>
                  <button className="flex gap-2 items-center p-1 rounded-md hover:bg-gray-2">
                    {" "}
                    <BsFillShareFill /> Share
                  </button>
                </Menu.Item>
                {currentUser?.uid === post.userInfo.userId ? (
                  <Menu.Item>
                    <button
                      className="flex gap-2 items-center p-1 rounded-md hover:bg-gray-2"
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
