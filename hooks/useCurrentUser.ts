import { auth } from "@/utils/firebase";

const useCurrentUser = () => {
  const user = auth.currentUser;

  return user;
};

export default useCurrentUser;
