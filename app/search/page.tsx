"use client";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import PostItem from "@/components/posts/PostItem";
import FollowersItem from "@/components/users/FollowersItem";
import { useState } from "react";

const SearchPage = () => {
  const [posts, setPosts] = useState([] as any);
  const [users, setUsers] = useState([] as any);

  return (
    <section className="max-w-3xl mx-auto mt-24">
      <SearchForm setPosts={setPosts} setUsers={setUsers} />
      {/* <div>
        {posts.map((post: Record<string, any>) => (
          <PostItem post={post} key={post.postId} />
        ))}
      </div>
      <div>
        {users.map((user: any) => (
          <FollowersItem user={user} key={user.uid} />
        ))}
      </div> */}

      <SearchResults users={users} posts={posts} />
    </section>
  );
};

export default SearchPage;
