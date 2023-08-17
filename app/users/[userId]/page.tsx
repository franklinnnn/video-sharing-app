"use client";
import PostFeed from "@/components/PostFeed";
import UserBio from "@/components/users/UserBio";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// const database = getFirestore();

const UserProfile = () => {
  const params = useParams();
  const userId = params.userId;
  const [fetchedUser, setFetchedUser] = useState({} as any);
  const [activeTab, setActiveTab] = useState("Videos");

  useEffect(() => {
    getUser(userId as string);
  }, []);

  const getUser = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setFetchedUser(userSnap.data());
    } else {
      console.log("no document");
    }
  };

  return (
    <div className="h-full w-full p-2 bg-zinc-800 rounded-md">
      <UserBio user={fetchedUser} />
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
      <PostFeed userId={userId as string} />
    </div>
  );
};

export default UserProfile;
