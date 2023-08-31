import { useAuthContext } from "@/context/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";

export const useAuth = () => {
  const authContext = useAuthContext();
  const [user, loading, error] = useAuthState(auth);

  return {
    user,
    loading,
    error,
  };
};
