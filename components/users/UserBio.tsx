import useCurrentUser from "@/hooks/useCurrentUser";
import { UserBioProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import EditModal from "../Modals/EditModal";
import { collection, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import FollowButton from "./FollowButton";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "../Loader";
import LoginModal from "../Modals/LoginModal";

const UserBio = ({
  user,
  setActiveTab,
  isFollowing,
  setIsFollowing,
}: UserBioProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const { currentUser } = useCurrentUser();

  const followersQuery = query(collection(db, `users/${user.uid}/followers`));
  const [followers] = useCollectionData(followersQuery);
  const likesQuery = query(collection(db, `users/${user.uid}/likedPosts`));
  const [likes] = useCollectionData(likesQuery);

  return (
    <>
      {Object.keys(user).length === 0 ? (
        <div className="h-60 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="p-4 rounded-md">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="w-28 h-28">
              <Image
                src={user.photoURL || "/images/placeholder.png"}
                alt="User profile photo"
                width={112}
                height={112}
                className="object-cover w-28 h-28 rounded-full"
              />
            </div>
            <div className="flex flex-col items-start justify-evenly gap-2">
              <h1 className="text-4xl font-semibold font-display">
                {user.displayName ? (
                  user.displayName
                ) : (
                  <div className="w-36 h-10 animate-pulse bg-primary/10 rounded-md" />
                )}
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
                  openModal={() => setOpenLoginModal(true)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-row gap-6 my-2 text-sm md:text-base">
            <div
              onClick={() => setActiveTab("Followers")}
              className="hover:underline hover:cursor-pointer"
            >
              <span className="font-semibold">{followers?.length}</span>{" "}
              Followers
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
        </div>
      )}
      <EditModal
        isOpen={openEditModal}
        closeModal={() => setOpenEditModal(false)}
      />
      <LoginModal
        isOpen={openLoginModal}
        closeModal={() => setOpenLoginModal(false)}
        href={user.username}
      />
    </>
  );
};

export default UserBio;
