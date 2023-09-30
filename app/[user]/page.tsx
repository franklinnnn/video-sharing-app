"use client";
import PostFeed from "@/components/posts/PostFeed";
import Followers from "@/components/users/Followers";
import Likes from "@/components/users/Likes";
import UserBio from "@/components/users/UserBio";
import useCurrentUser from "@/hooks/useCurrentUser";
import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useUser } from "@/hooks/useUser";
import { useFollowingCheck } from "@/hooks/useFollowingCheck";

const UserProfile = () => {
  const params = useParams();
  const username = params.user;
  const { currentUser } = useCurrentUser();
  // const [fetchedUser, setFetchedUser] = useState({} as any);
  const [activeTab, setActiveTab] = useState("Videos");
  const [isFollowing, setIsFollowing] = useState(false);

  const { data: fetchedUser } = useUser(username as string);
  // console.log(testUser);

  // const getUser = async () => {
  //   const q = query(collection(db, "users"), where("username", "==", username));
  //   const usersSnapshot = await getDocs(q);
  //   usersSnapshot.forEach((doc) => {
  //     setFetchedUser(doc.data());
  //   });
  // };

  // const { isFollowing } = useFollowingCheck(fetchedUser.uid);
  // console.log(isFollowing);

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
    // getUser();
    handleFollowingCheck();
  }, [fetchedUser]);

  return (
    <div className="h-full w-full p-2">
      <UserBio
        user={fetchedUser}
        setActiveTab={setActiveTab}
        isFollowing={isFollowing}
        setIsFollowing={setIsFollowing}
      />

      <div className="flex flex-row items-center my-4">
        <button
          className={`px-1 sm:px-6 text-sm sm:text-base border-b-2 hover:bg-primary/10 rounded-t-md transition ${
            activeTab === "Videos" ? "border-b-primary" : "border-transparent"
          }`}
          onClick={() => setActiveTab("Videos")}
        >
          Videos
        </button>
        <button
          className={`px-1 sm:px-6 border-b-2 hover:bg-primary/10 rounded-t-md transition ${
            activeTab === "Followers"
              ? "border-b-primary"
              : "border-transparent"
          }`}
          onClick={() => setActiveTab("Followers")}
        >
          Followers
        </button>
        <button
          className={`px-1 sm:px-6 text-sm sm:text-base border-b-2 hover:bg-primary/10 rounded-t-md transition ${
            activeTab === "Likes" ? "border-b-primary" : "border-transparent"
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
    </div>
  );
};

export default UserProfile;
