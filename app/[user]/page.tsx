"use client";
import PostFeed from "@/components/PostFeed";
import Followers from "@/components/users/Followers";
import UserBio from "@/components/users/UserBio";
import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const params = useParams();
  const username = params.user;
  const [fetchedUser, setFetchedUser] = useState({} as any);
  const [activeTab, setActiveTab] = useState("Videos");

  const getUser = async () => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const usersSnapshot = await getDocs(q);
    usersSnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());
      setFetchedUser(doc.data());
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="h-full w-full p-2">
      <UserBio user={fetchedUser} setActiveTab={setActiveTab} />

      <div className="flex flex-row items-center my-4  ">
        <button
          className={`px-6 border-b-2 hover:bg-zinc-600 transition ${
            activeTab === "Videos" ? "border-b-zinc-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab("Videos")}
        >
          Videos
        </button>
        <button
          className={`px-6 border-b-2 hover:bg-zinc-600 transition ${
            activeTab === "Followers"
              ? "border-b-zinc-600"
              : "border-transparent"
          }`}
          onClick={() => setActiveTab("Followers")}
        >
          Followers
        </button>
        <button
          className={`px-6 border-b-2 hover:bg-zinc-600 transition ${
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
    </div>
  );
};

export default UserProfile;
