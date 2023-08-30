"use client";

import CommentItem from "@/components/posts/CommentItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { usePost } from "@/hooks/usePost";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const PostView = () => {
  const [post, setPost] = useState({} as any);
  const params = useParams();
  const postId = params.postId;

  const router = useRouter();

  console.log(post.video);

  const currentUser = useCurrentUser();

  const getPost = async (postId: string) => {
    setPost({});
    const postSnap = await getDoc(doc(db, "posts", postId));
    if (postSnap.exists()) {
      setPost(postSnap.data());
    } else {
      console.log("document does not exist");
    }
  };

  useEffect(() => {
    getPost(postId as string);
  }, []);

  const renderVideo = (video: string) => {
    return (
      <video controls autoPlay className="h-full w-full">
        <source src={video} type="video/mp4" />
      </video>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <div className="relative flex flex-row items-center justify-center h-full w-full">
        <div
          onClick={() => router.back()}
          className="absolute top-20 left-0 bg-zinc-800/40 rounded-full m-2 p-2 z-10 hover:bg-zinc-800/90 hover:cursor-pointer transition"
        >
          <MdClose size={24} />
        </div>
        <div className="h-full w-[65%] bg-zinc-900">
          {post.video && renderVideo(post.video)}
          <div className="h-full w-full " />
        </div>
        <div className="relative top-20 h-full w-[35%] min-w-72 ">
          <div className="flex flex-col py-2 px-4 m-2 rounded-md bg-zinc-500/20">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <div className="min-w-20 rounded-full overflow-hidden">
                  <Image
                    src={post.userInfo?.photoURL}
                    alt="User profile photo"
                    width={60}
                    height={60}
                    className="object-fit"
                  />
                </div>
                <div>
                  <p>{post.userInfo?.username}</p>
                  <p>{post.userInfo?.displayName}</p>
                </div>
              </div>
              {currentUser?.uid === post.userInfo?.userId ? (
                <button className="px-6 object-fit border-2 h-10 border-fuchsia-500 rounded-md hover:bg-fuchsia-500/90 transition">
                  Edit
                </button>
              ) : (
                <button className="border-2 border-zinc-700 rounded-md text-sm p-2 h-10">
                  Following
                </button>
              )}
            </div>
            <p>{post.caption}</p>
          </div>
          <div className="p-4">
            <div className="flex gap-2">
              <h1>Comments</h1>
              <span>69</span>
            </div>
            <div>
              <CommentItem />
              <CommentItem />
              <CommentItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
