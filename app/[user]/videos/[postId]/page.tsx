"use client";
import LikePostButton from "@/components/posts/LikePostButton";
import CommentFeed from "@/components/posts/CommentFeed";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import CommentButton from "@/components/posts/CommentButton";
import Video from "@/components/posts/Video";
import { getRelativeTime, handleCopyUrl } from "@/utils/index";
import { usePost } from "@/hooks/usePost";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const PostView = () => {
  const params = useParams();
  const postId = params.postId;
  const username = params.user;
  const pathname = usePathname();

  const { data: post } = usePost(postId as string);
  const { data: user } = useUser(username as string);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const goToPage = () => {
    router.push(`/${user.username}`);
  };
  const renderVideo = (video: string) => {
    return <Video video={video} isBigVideo />;
  };

  useEffect(() => {
    post || user ? setLoading(false) : setLoading(true);
  }, []);

  return (
    <section className="fixed top-0 left-0 w-screen h-screen">
      <div className="relative flex flex-row items-center justify-center h-full w-full">
        <div
          onClick={() => router.back()}
          className="absolute top-20 left-0 bg-main-light/40 hover:bg-main-light/50 rounded-full m-2 p-2 z-10 hover:cursor-pointer transition"
        >
          <MdClose size={24} />
        </div>

        {/* VIDEO SECTION */}
        <div className="h-full w-[60%] bg-zinc-900">
          {post.video && renderVideo(post.video)}
        </div>

        {/* USER AND COMMENTS SECTION */}
        <div className="relative top-20 h-full w-[40%] min-w-72">
          {Object.keys(user).length === 0 ? (
            <div className="w-full h-64 flex items-center justify-center border-b-2 border-b-primary/20 dark:border-b-zinc-200/20">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col py-2 px-4 m-2 border-b-2 border-b-primary/20 dark:border-b-zinc-200/20">
              <div className="flex justify-between mb-4">
                <div className="flex gap-2 items-center">
                  <div className="min-w-20 rounded-full overflow-hidden">
                    <Image
                      src={post.userInfo?.photoURL || "/images/placeholder.png"}
                      alt="User profile photo"
                      width={60}
                      height={60}
                      className="object-fit"
                    />
                  </div>
                  <div>
                    <p
                      onClick={goToPage}
                      className="text-xl font-semibold hover:underline hover:cursor-pointer"
                    >
                      {post.userInfo?.displayName}
                    </p>
                    <p className="text-zinc-500">
                      @{post.userInfo?.username}{" "}
                      <span className="text-xs text-zinc-500">
                        • {getRelativeTime(post.timestamp?.seconds)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <p>{post.caption}</p>

              <div className="flex gap-4 my-4 text-sm font-semibold">
                <LikePostButton postId={post.postId} userId={user.uid} />
                <CommentButton postId={post.postId} onClick={() => {}} />
              </div>
              <div className="w-full">
                <p>Share</p>
                <div className="flex justify-evenly bg-primary/10 dark:bg-zinc-200/10 rounded-md mr-2 mt-2">
                  <p className="p-2 text-zinc-500 w-full truncate">
                    localhost:3000{pathname}
                  </p>
                  <button
                    onClick={() => handleCopyUrl(pathname)}
                    className="px-4 rounded-r-md font-semibold hover:bg-primary/20 hover:dark:bg-zinc-200/20"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}
          <CommentFeed post={post} />
        </div>
      </div>
    </section>
  );
};

export default PostView;
