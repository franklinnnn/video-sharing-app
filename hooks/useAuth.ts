import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);

  return {
    user,
    loading,
    error,
  };
};
