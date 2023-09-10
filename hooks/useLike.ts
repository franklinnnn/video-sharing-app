import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useLike = async (postId: string, currentUserId: string) => {
  let likes = <any>[];
  let result = false;
  const likesQuery = query(
    collection(db, "posts"),
    where("postId", "==", postId)
  );
  const likesSnapshot = await getDocs(likesQuery);
  likesSnapshot.forEach((doc) => {
    likes = doc.data();
    console.log(likes);
  });

  likes?.map((like: any) => {
    like.uid === currentUserId ? (result = true) : (result = false);
  });
};
