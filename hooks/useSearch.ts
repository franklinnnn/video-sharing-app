import { db } from "@/utils/firebase";
import {
  and,
  collection,
  getDocs,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const useSearch = (input?: string) => {
  const postQuery = query(
    collection(db, "posts"),
    orderBy("timestamp", "desc")
  );
  const [posts] = useCollectionData(postQuery);
  const postsFilter = posts?.filter((post) =>
    post.caption.toLowerCase().includes(input)
  );

  return postsFilter;
};

export default useSearch;
