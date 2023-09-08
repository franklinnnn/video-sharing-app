import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export const useCurrentUsername = async (userId: string) => {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const [currentUsername, setCurrentUsername] = useState("");
    await getDoc(doc(db, "users", userId)).then((doc) => {
      setCurrentUsername(doc.data()?.username);
      console.log(currentUsername);
      return currentUsername;
    });
  } catch (error) {
    console.log(error);
  }
};
