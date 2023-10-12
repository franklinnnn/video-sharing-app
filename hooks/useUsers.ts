import { db } from "@/utils/firebase";
import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const useUsers = () => {
  const usersQuery = query(collection(db, "posts"));
  const [users] = useCollectionData(usersQuery);

  return users;
};

export default useUsers;
