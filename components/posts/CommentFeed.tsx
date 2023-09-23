import { db } from "@/utils/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import { CommentFeedProps } from "@/types";

const CommentFeed = ({ post }: CommentFeedProps) => {
  const [comments] = useCollectionData(
    query(
      collection(db, `posts/${post.postId}/comments`),
      orderBy("timestamp", "desc")
    )
  );
  return (
    <section className="relative flex flex-col justify-between w-full h-full">
      <div className="p-4 h-full overflow-auto [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          <h1>Comments</h1>
          <span>
            {comments && comments?.length < 1 ? "(0)" : `(${comments?.length})`}
          </span>
        </div>
        <div>
          {comments?.map((comment) => (
            <CommentItem
              comment={comment}
              key={comment.timestamp}
              postId={post.postId}
            />
          ))}
        </div>
        <CommentInput postId={post.postId} postUserId={post.userInfo?.userId} />
      </div>
    </section>
  );
};

export default CommentFeed;
