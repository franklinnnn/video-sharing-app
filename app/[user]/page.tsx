"use client";
import PostFeed from "@/components/posts/PostFeed";
import Followers from "@/components/users/Followers";
import Likes from "@/components/users/Likes";
import UserBio from "@/components/users/UserBio";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUser } from "@/hooks/useUser";
import { db } from "@/utils/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollectionData, useDocument } from "react-firebase-hooks/firestore";

const UserProfile = () => {
  const params = useParams();
  const username = params.user;
  const { currentUser } = useCurrentUser();
  const [fetchedUser, setFetchedUser] = useState({} as any);
  const [activeTab, setActiveTab] = useState("Videos");
  const [isFollowing, setIsFollowing] = useState(false);

  const getUser = async () => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const usersSnapshot = await getDocs(q);
    usersSnapshot.forEach((doc) => {
      setFetchedUser(doc.data());
    });
  };

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
    getUser();
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

      <div className="flex flex-row items-center my-4  ">
        <button
          className={`px-6 border-b-2 hover:bg-gray-1 rounded-t-md transition ${
            activeTab === "Videos" ? "border-b-zinc-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab("Videos")}
        >
          Videos
        </button>
        <button
          className={`px-6 border-b-2 hover:bg-gray-1 rounded-t-md transition ${
            activeTab === "Followers"
              ? "border-b-zinc-600"
              : "border-transparent"
          }`}
          onClick={() => setActiveTab("Followers")}
        >
          Followers
        </button>
        <button
          className={`px-6 border-b-2 hover:bg-gray-1 rounded-t-md transition ${
            activeTab === "Likes" ? "border-b-zinc-600" : "border-transparent"
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
