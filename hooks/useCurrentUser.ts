import { auth, db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useCurrentUser = () => {
  try {
  } catch (error) {
    console.log(error);
  }
  const [user, loading, error] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState<any>({});

  const getUser = async () => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        setCurrentUser(userSnapshot.data());
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return { currentUser, loading, error };
};

export default useCurrentUser;
