import { db } from "@/utils/firebase";
import { doc } from "firebase/firestore";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";

export const usePost = async (postId: string) => {
  const [value, loading, error] = useDocument(doc(db, "posts", postId), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return value;
};
