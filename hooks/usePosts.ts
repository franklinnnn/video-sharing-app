import { db } from "@/utils/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const usePosts = (userId?: string) => {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const [posts] = useCollectionData(q);
  const userPosts = posts?.filter((post) => post.userInfo.userId === userId);

  if (userId) {
    return userPosts;
  } else return posts;
};

export default usePosts;
