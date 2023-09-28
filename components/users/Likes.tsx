import { db } from "@/utils/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LikesItem from "./LikesItem";
import { LikesProps } from "@/types";
import { useLikes } from "@/hooks/useLikes";

const Likes = ({ userId }: LikesProps) => {
  const likesQuery = query(
    collection(db, `/users/${userId}/likedPosts`),
    orderBy("timestamp", "desc")
  );
  const [likes] = useCollectionData(likesQuery);

  const { likes: testLikes } = useLikes(userId);
  console.log(testLikes);

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
                <LikesItem item={item} key={item.postId} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Likes;
