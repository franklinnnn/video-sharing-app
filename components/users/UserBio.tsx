import useCurrentUser from "@/hooks/useCurrentUser";
import { UserProps } from "@/types";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import EditModal from "../EditModal";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";

interface UserBioProps {
  user: UserProps;
}

const UserBio = ({ user }: UserBioProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);

  const currentUser = useCurrentUser();

  // const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
  //   console.log(doc.data()?.bio);
  // });
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Image
          src={currentUser?.photoURL || "/images/placeholder.png"}
          alt="User profile photo"
          height={100}
          width={100}
          className="rounded-full"
        />
        <div className="flex flex-col items-start justify-evenly w-full gap-2">
          <h1 className="text-4xl font-semibold">{user.displayName}</h1>
          {currentUser?.uid === user.uid ? (
            <button
              className="py-1 px-6 object-fit border-2  border-fuchsia-500 rounded-md hover:bg-fuchsia-500/90 transition"
              onClick={() => setOpenEditModal(true)}
            >
              Edit
            </button>
          ) : (
            <button className="py-1 px-6 object-fit border-2 bg-fuchsia-500 border-fuchsia-500 rounded-md hover:bg-fuchsia-500/90 transition">
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-6 my-2 text-zinc-500">
        <div>
          <span className="font-semibold">100</span> Followers
        </div>{" "}
        <div>
          <span className="font-semibold">100</span> Likes
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-md">{user.bio}</p>
        <Link href="" className="text-sm font-semibold hover:underline">
          {user.website}
        </Link>
      </div>

      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        className="relative z-20"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <EditModal
              isOpen={openEditModal}
              closeModal={() => setOpenEditModal(false)}
              user={user}
              // href={"/upload"}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default UserBio;
