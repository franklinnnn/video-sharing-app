import { db } from "@/utils/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LikesItem from "./LikesItem";

interface LikesProps {
  userId: string;
}

const Likes = ({ userId }: LikesProps) => {
  const likesQuery = query(
    collection(db, `/users/${userId}/likedPosts`),
    orderBy("timestamp", "desc")
  );
  const [likes] = useCollectionData(likesQuery);

  return (
    <>
      {likes && (
        <div>
          {likes.length < 1 ? (
            <div className="flex justify-center text-lg font-semibold pt-4">
              User hasn't liked a post yet 👎
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {likes?.map((item) => (
                <LikesItem item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Likes;
