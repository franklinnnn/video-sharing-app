"use client";
import LikePostButton from "@/components/posts/LikePostButton";
import CommentFeed from "@/components/posts/CommentFeed";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";
import CommentButton from "@/components/posts/CommentButton";
import Video from "@/components/posts/Video";
import { getRelativeTime } from "@/utils/index";
import { usePost } from "@/hooks/usePost";
import { useUser } from "@/hooks/useUser";
import { ToastContainer } from "react-toastify";

const PostView = () => {
  const params = useParams();
  const postId = params.postId;
  const username = params.user;

  const { data: post, loading: loadingPost } = usePost(postId as string);
  const { data: user, loading: loadingUser } = useUser(username as string);

  const router = useRouter();
  const goToPage = () => {
    router.push(`/${user.username}`);
  };
  const renderVideo = (video: string) => {
    return <Video video={video} isBigVideo />;
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
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
        <div className="relative top-20 h-full w-[40%] min-w-72 ">
          {loadingPost ? (
            <div>loading...</div>
          ) : (
            <div className="flex flex-col py-2 px-4 m-2 border-b-2 border-b-primary/20">
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
            </div>
          )}
          <CommentFeed post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostView;
