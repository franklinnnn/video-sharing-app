"use client";
import PostFeed from "@/components/posts/PostFeed";
import Followers from "@/components/users/Followers";
import Likes from "@/components/users/Likes";
import UserBio from "@/components/users/UserBio";
import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import { collection, query } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useUser } from "@/hooks/useUser";
import Loader from "@/components/Loader";

const UserPage = () => {
  const params = useParams();
  const username = params.user;
  const { currentUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState("Videos");
  const [isFollowing, setIsFollowing] = useState(false);

  const { data: fetchedUser } = useUser(username as string);

  console.log(fetchedUser);

  const followingQuery = query(
    collection(db, `users/${currentUser?.uid}/following`)
  );
  const [following] = useCollectionData(followingQuery);

  const handleFollowingCheck = () => {
    following?.map((followingUser) => {
      if (followingUser.uid === fetchedUser.uid) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    });
  };

  useEffect(() => {
    handleFollowingCheck();
  }, [fetchedUser.uid, following]);

  return (
    <section className="h-full max-w-2xl mx-auto mt-20 p-2">
      {!fetchedUser ? (
        <Loader />
      ) : (
        <>
          <UserBio
            user={fetchedUser}
            setActiveTab={setActiveTab}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
          />

          <div className="flex flex-row items-center my-4">
            <button
              className={`w-24 sm:w-32 text-sm sm:text-base border-b-2 hover:bg-primary/10 hover:dark:bg-zinc-800 rounded-t-md transition ${
                activeTab === "Videos"
                  ? "border-b-primary dark:border-b-zinc-200"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("Videos")}
            >
              Videos
            </button>
            <button
              className={`w-24 sm:w-32 border-b-2 hover:bg-primary/10 hover:dark:bg-zinc-800 rounded-t-md transition ${
                activeTab === "Followers"
                  ? "border-b-primary dark:border-b-zinc-200"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("Followers")}
            >
              Followers
            </button>
            <button
              className={`w-24 sm:w-32 text-sm sm:text-base border-b-2 hover:bg-primary/10 hover:dark:bg-zinc-800 rounded-t-md transition ${
                activeTab === "Likes"
                  ? "border-b-primary dark:border-b-zinc-200"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("Likes")}
            >
              Likes
            </button>
          </div>
          {activeTab === "Videos" && (
            <PostFeed userId={fetchedUser.uid as string} />
          )}
          {activeTab === "Followers" && <Followers userId={fetchedUser.uid} />}
          {activeTab === "Likes" && <Likes userId={fetchedUser.uid} />}
        </>
      )}
    </section>
  );
};

export default UserPage;
