import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const useUser = async (userId: string) => {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    await getDoc(doc(db, "users", userId)).then((doc) => {
      return doc.data();
    });
  } catch (error) {
    console.log(error);
  }
};

export default useUser;
