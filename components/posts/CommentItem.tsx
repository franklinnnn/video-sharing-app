import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LikeCommentButton from "./LikeCommentButton";
import { CommentItemProps } from "@/types";
import { AiFillDelete } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { getRelativeTime } from "@/utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentItem = ({ postId, comment }: CommentItemProps) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const goToPage = () => {
    router.push(`/${comment.userInfo.username}`);
  };

  const handleDeleteComment = async () => {
    const commentRef = doc(db, "posts", postId, "comments", comment.commentId);
    await deleteDoc(commentRef);
    toast.success("Comment deleted ❌");
  };

  return (
    <div className="flex items-start gap-2 my-6">
      <Image
        src={comment.userInfo.photoURL}
        alt="User profile photo"
        width={50}
        height={50}
        className="object-fit w-16 h-16 rounded-full"
      />
      <div className="text-sm w-full">
        <div className="flex gap-4 items-center">
          <span
            onClick={goToPage}
            className="font-semibold hover:underline hover:cursor-pointer"
          >
            {comment.userInfo.displayName}
          </span>{" "}
          <span className="text-xs text-zinc-500">
            {getRelativeTime(comment.timestamp?.seconds)}
          </span>
        </div>
        <p>{comment.comment}</p>

        <div className="flex gap-6 items-center justify-between w-full mt-2">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <LikeCommentButton
                postId={postId}
                commentId={comment.commentId}
              />
            </div>
            {/* <div>Reply</div> */}
          </div>
          {currentUser && currentUser.uid === comment.userInfo.userId && (
            <AiFillDelete
              size={12}
              className="text-zinc-500 hover:text-red-500  hover:cursor-pointer"
              onClick={handleDeleteComment}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
