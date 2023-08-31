import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const useCurrentUser = () => {
  const [user, loading, error] = useAuthState(auth);
  const currentUser = user;

  return { currentUser, loading, error };
};

export default useCurrentUser;
