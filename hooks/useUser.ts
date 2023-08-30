import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

const useUser = async (userId: string) => {
  // const userRef = doc(db, "users", userId);
  // const userSnap = await getDoc(userRef);

  // if (userSnap.exists()) {
  //   console.log(userSnap.data());
  // } else {
  //   console.log("no document");
  // }

  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    // const existingUser = await getDoc(doc(db, "users", userId));
    // if (existingUser.exists()) {
    //   const user = existingUser.data();
    //   return user;
    // } else {
    //   console.log("No such document");
    // }

    await getDoc(doc(db, "users", userId)).then((doc) => {
      return doc.data();
    });
  } catch (error) {
    console.log(error);
  }
};

export default useUser;
