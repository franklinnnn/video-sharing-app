import React, { useState } from "react";
import PostItem from "./posts/PostItem";
import FollowersItem from "./users/FollowersItem";

type SearchResultsProps = {
  posts: any[];
  users: any[];
};
const SearchResults = ({ posts, users }: SearchResultsProps) => {
  console.log(posts, users);
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <div>
      <div>
        {posts.map((post: Record<string, any>) => (
          <PostItem post={post} key={post.postId} />
        ))}
      </div>
      <div>
        {users.map((user: any) => (
          <FollowersItem user={user} key={user.uid} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
