"use client";
import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import { PostFeedProps } from "@/types";

const PostFeed = ({ userId }: PostFeedProps) => {
  const posts = usePosts(userId);
  return (
    <section className="h-full w-full flex flex-col items-center ">
      {posts && posts?.length === 0 ? (
        <div>User has no posts</div>
      ) : (
        <>
          {posts
            ?.filter((post) => post.video)
            .map((post: Record<string, any>) => (
              <PostItem post={post} key={post.postId} />
            ))}
        </>
      )}
    </section>
  );
};

export default PostFeed;
