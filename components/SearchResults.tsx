import React, { useState } from "react";
import PostItem from "./posts/PostItem";
import FollowersItem from "./users/FollowersItem";
import { SearchResultsProps } from "@/types";
import Loader from "./Loader";
import Link from "next/link";
import Image from "next/image";

const SearchResults = ({ posts, users, loading }: SearchResultsProps) => {
  console.log(posts, users);
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full col-span-2 flex my-4">
        <button
          onClick={() => setActiveTab("posts")}
          className={`w-full col-span-1 flex justify-center text-xl hover:cursor-pointer hover:bg-primary/10 hover:dark:bg-zinc-200/10 rounded-t-md transition border-b-2 ${
            activeTab === "posts"
              ? "border-primary dark:border-zinc-200"
              : "border-transparent"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`w-full col-span-1 flex justify-center text-xl hover:cursor-pointer hover:bg-primary/10 hover:dark:bg-zinc-200/10 rounded-t-md transition border-b-2 ${
            activeTab === "users"
              ? "border-primary dark:border-zinc-200"
              : "border-transparent"
          }`}
        >
          Users
        </button>
      </div>
      {activeTab === "posts" && (
        <>
          {posts.length < 1 ? (
            <span className="text-2xl font-semibold mt-6">
              No results found 🤷‍♂️
            </span>
          ) : (
            <div>
              {posts.map((post: Record<string, any>) => (
                <PostItem post={post} key={post.postId} />
              ))}
            </div>
          )}
        </>
      )}
      {activeTab === "users" && (
        <>
          {users.length < 1 ? (
            <span className="text-2xl font-semibold mt-6">
              No results found 🤷‍♂️
            </span>
          ) : (
            <>
              {users.map((user: any) => (
                <Link
                  href={user.username}
                  className="flex flex-row gap-4 items-center justify-between p-2 my-2 hover:cursor-pointer w-full max-w-2xl"
                >
                  <div className="flex gap-4 items-start justify-start">
                    <Image
                      src={user.photoURL}
                      alt={user.displayName}
                      height={45}
                      width={45}
                      className="object-fit rounded-full"
                    />
                    <div className="text-md">
                      <p className="text-lg sm:text-xl font-semibold hover:underline">
                        {user.displayName}
                      </p>
                      <p className="text-zinc-500">@{user.username}</p>
                      <p>{user.bio}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
