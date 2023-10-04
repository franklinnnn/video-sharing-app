import useCurrentUser from "@/hooks/useCurrentUser";
import { UserBioProps } from "@/types";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditModal from "../Modals/EditModal";
import { collection, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import FollowButton from "./FollowButton";
import { useCollectionData } from "react-firebase-hooks/firestore";

const UserBio = ({
  user,
  setActiveTab,
  isFollowing,
  setIsFollowing,
}: UserBioProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const { currentUser } = useCurrentUser();
  const followersQuery = query(collection(db, `users/${user.uid}/followers`));
  const [followers] = useCollectionData(followersQuery);
  const likesQuery = query(collection(db, `users/${user.uid}/likedPosts`));
  const [likes] = useCollectionData(likesQuery);

  return (
    <div className="p-4 rounded-md">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Image
          src={user.photoURL || "/images/placeholder.png"}
          alt="User profile photo"
          width={112}
          height={112}
          className="object-fit w-28 h-28 rounded-full"
        />

        <div className="flex flex-col items-start justify-evenly w-full gap-2">
          <h1 className="text-4xl font-semibold font-display">
            {user.displayName}
          </h1>
          <p className="text-primary/80 dark:text-zinc-500 text-lg -mt-4">
            @{user?.username}
          </p>
          {currentUser?.uid === user.uid ? (
            <button
              className="py-1 px-6 object-fit border-2 font-semibold border-primary rounded-md hover:bg-primary/20 dark:border-zinc-200 hover:dark:bg-zinc-800 transition"
              onClick={() => setOpenEditModal(true)}
            >
              Edit
            </button>
          ) : (
            <FollowButton
              user={user}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row gap-6 my-2 text-sm md:text-base">
        <div
          onClick={() => setActiveTab("Followers")}
          className="hover:underline hover:cursor-pointer"
        >
          <span className="font-semibold">{followers?.length}</span> Followers
        </div>{" "}
        <div
          onClick={() => setActiveTab("Likes")}
          className="hover:underline hover:cursor-pointer"
        >
          <span className="font-semibold">{likes?.length}</span> Likes
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-md">{user.bio}</p>
        <a
          href={user.website}
          className="text-sm font-semibold hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {user.website}
        </a>
      </div>

      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        className="relative z-20"
      >
        <div
          className="fixed inset-0 bg-primary/20 dark:bg-main-light/10"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <EditModal
              isOpen={openEditModal}
              closeModal={() => setOpenEditModal(false)}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default UserBio;
