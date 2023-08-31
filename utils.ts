import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "./utils/firebase";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const router = useRouter();

export const signInUser = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("User signed in successfully");
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
      alert("something went wrong");
    });
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      alert("User has been signed out");
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
      alert("something went wrong");
    });
};

export const getUserDetails = async (setUserDetails: any, username: string) => {
  try {
    const userSnapshot = await getDocs(
      query(collection(db, "users"), where("username", "==", username))
    );
    userSnapshot.forEach((doc) => {
      setUserDetails(doc.data());
    });
  } catch (error) {
    console.log(error);
    setUserDetails({});
  }
};
