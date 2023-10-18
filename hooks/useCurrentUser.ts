import { auth, db } from "@/utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useCurrentUser = () => {
  const [user, loading, error] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState<any>({});

  // const getUser = async () => {
  //   if (user) {
  //     const userRef = doc(db, "users", user?.uid);
  //     const userSnapshot = await getDoc(userRef);
  //     setCurrentUser(userSnapshot.data());
  //   }
  // };

  // useEffect(() => {
  //   try {
  //     getUser();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [user]);

  const getUser = async () => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      const unsub = onSnapshot(userRef, (doc) => {
        setCurrentUser(doc.data());
      });
    }
  };

  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return { currentUser, loading, error };
};

export default useCurrentUser;
