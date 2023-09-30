import { CommentButtonProps } from "@/types";
import { db } from "@/utils/firebase";
import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaComment } from "react-icons/fa";

const CommentButton = ({ postId, onClick }: CommentButtonProps) => {
  const commentsQuery = query(collection(db, `/posts/${postId}/comments`));
  const [comments] = useCollectionData(commentsQuery);

  return (
    <>
      <button
        onClick={onClick}
        className={`group flex gap-2 items-center justify-center transition`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full p-1 bg-primary/10 group-hover:bg-primary/20">
          <FaComment />
        </div>
        <span>{comments?.length}</span>
      </button>
    </>
  );
};

export default CommentButton;
