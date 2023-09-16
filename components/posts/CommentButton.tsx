import { db } from "@/utils/firebase";
import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaComment } from "react-icons/fa";

interface CommentButtonProps {
  postId: string;
  onClick: () => void;
}

const CommentButton = ({ postId, onClick }: CommentButtonProps) => {
  const commentsQuery = query(collection(db, `/posts/${postId}/comments`));
  const [comments] = useCollectionData(commentsQuery);

  return (
    <>
      <button
        onClick={onClick}
        className={`group flex gap-2 items-center justify-center transition`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full p-1 bg-gray-1 group-hover:bg-gray-2">
          <FaComment />
        </div>
        <span>{comments?.length}</span>
      </button>
    </>
  );
};

export default CommentButton;
