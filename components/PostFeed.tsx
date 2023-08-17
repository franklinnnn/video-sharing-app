"use client";

import usePosts from "@/hooks/usePosts";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}
const PostFeed = ({ userId }: PostFeedProps) => {
  const posts = usePosts(userId);
  // console.log(posts && posts?.length === 0 ? "no posts" : posts);
  return (
    <div className="h-full w-full flex flex-col items-center ">
      {posts && posts?.length === 0 ? (
        <div>User has no posts</div>
      ) : (
        <>
          {posts?.map((post: Record<string, any>) => (
            <PostItem post={post} key={post.postId} />
          ))}
        </>
      )}
    </div>
  );
};

export default PostFeed;
