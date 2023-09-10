"use client";
import LikePostButton from "@/components/LikePostButton";
import CommentFeed from "@/components/posts/CommentFeed";
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const PostView = () => {
  const params = useParams();
  const postId = params.postId;
  const username = params.user;

  const [post, setPost] = useState({} as any);
  const [fetchedUser, setFetchedUser] = useState({} as any);

  const router = useRouter();

  const getPost = async (postId: string) => {
    setPost({});
    const postSnap = await getDoc(doc(db, "posts", postId));
    if (postSnap.exists()) {
      setPost(postSnap.data());
    } else {
      console.log("document does not exist");
    }
  };

  const getUser = async () => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const usersSnapshot = await getDocs(q);
    usersSnapshot.forEach((doc) => {
      setFetchedUser(doc.data());
    });
  };

  const likesQuery = query(collection(db, `posts/${postId}/likes`));
  const [likes] = useCollectionData(likesQuery);

  const commentsQuery = query(collection(db, `posts/${postId}/comments`));
  const [comments] = useCollectionData(commentsQuery);

  useEffect(() => {
    getPost(postId as string);
    getUser();
  }, [username]);

  const renderVideo = (video: string) => {
    return (
      <video controls className="h-full w-full">
        <source src={video} type="video/mp4" />
      </video>
    );
  };

  const goToPage = () => {
    router.push(`/${fetchedUser.username}`);
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

        {/* VIDEO SECTION */}
        <div className="h-full w-[65%] bg-zinc-900">
          {post.video && renderVideo(post.video)}
          <div className="h-full w-full " />
        </div>

        {/* USER AND COMMENTS SECTION */}
        <div className="relative top-20 h-full w-[35%] min-w-72 ">
          <div className="flex flex-col py-2 px-4 m-2 rounded-md bg-zinc-500/20">
            <div className="flex justify-between mb-4">
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
                  <p
                    onClick={goToPage}
                    className="text-lg font-semibold hover:underline hover:cursor-pointer"
                  >
                    {post.userInfo?.displayName}
                  </p>
                  <p className="text-zinc-500">@{post.userInfo?.username}</p>
                </div>
              </div>
            </div>
            <p>{post.caption}</p>

            <div className="flex gap-4 my-4 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <button className="flex items-center justify-center w-6 h-6 rounded-full p-1 bg-zinc-700 hover:bg-zinc-700/60 transition">
                  <AiFillHeart />
                </button>
                {likes?.length}
              </span>

              <span className="flex items-center gap-2">
                <button className="flex items-center justify-center w-6 h-6 rounded-full p-1 bg-zinc-700 hover:bg-zinc-700/60 transition">
                  <FaComment size={14} />
                </button>
                {comments?.length}
              </span>
            </div>
          </div>
          <CommentFeed postId={post.postId} />
        </div>
      </div>
    </div>
  );
};

export default PostView;
