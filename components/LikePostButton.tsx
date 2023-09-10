import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { AiFillHeart } from "react-icons/ai";

interface LikePostButtonProps {
  postId: string;
  likedPost: boolean;
  setLikedPost: (value: boolean) => void;
}

const LikePostButton = ({
  postId,
  likedPost,
  setLikedPost,
}: LikePostButtonProps) => {
  const { currentUser } = useCurrentUser();

  const handleLikePost = async () => {
    const postRef = doc(db, "posts", postId);
    if (currentUser) {
      if (likedPost) {
        await deleteDoc(doc(db, "posts", postId, "likes", currentUser.uid));

        console.log("unliked post");
        setLikedPost(false);
      } else {
        await setDoc(doc(postRef, "likes", currentUser.uid), {
          displayName: currentUser.displayName,
          uid: currentUser.uid,
        });

        console.log("liked post");
        setLikedPost(true);
      }
    }
  };

  return (
    <button
      onClick={handleLikePost}
      className="flex items-center justify-center w-10 h-10 rounded-full p-2 bg-zinc-700 hover:bg-zinc-700/60 transition"
    >
      <AiFillHeart
        size={24}
        className={likedPost ? "text-red-500" : "text-white"}
      />
    </button>
  );
};

export default LikePostButton;
