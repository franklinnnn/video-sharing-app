import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getCurrentUsername = async (userId: string) => {
  const getUsernameQuery = query(
    collection(db, "users"),
    where("uid", "==", userId)
  );
  onSnapshot(getUsernameQuery, (res) => {
    console.log(
      res.docs.map((doc) => {
        return { ...doc.data().username, id: doc.id };
      })
    );
  });
};
