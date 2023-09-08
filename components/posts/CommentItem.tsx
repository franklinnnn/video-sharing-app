import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsHeart, BsThreeDotsVertical } from "react-icons/bs";

interface CommentItemProps {
  comment: Record<string, any>;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const goToPage = () => {
    router.push(`/${comment.userInfo.username}`);
  };

  const getRelativeTime = () => {
    const date = new Date();
    const timestamp = date.getTime();
    const seconds = Math.floor(timestamp / 1000);
    const difference = seconds - comment.timestamp?.seconds;
    let output = "";

    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor(difference / 3600)} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor(difference / 86400)} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor(difference / 2620800)} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor(difference / 31449600)} years ago`;
    }
    return output;
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
          <span className="text-xs text-zinc-500">{getRelativeTime()}</span>
        </div>
        <p>{comment.comment}</p>

        <div className="flex gap-6 items-center justify-between w-full mt-2">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <BsHeart /> <span>10</span>
            </div>
            <div>Reply</div>
          </div>
          {currentUser && currentUser.uid === comment.userInfo.userId && (
            <BsThreeDotsVertical />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
