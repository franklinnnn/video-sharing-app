import { db } from "@/utils/firebase";
import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const useFollowers = (userId?: string) => {
  const q = query(collection(db, `users/${userId}/followers`));
  const [followers] = useCollectionData(q);

  return followers;
};
