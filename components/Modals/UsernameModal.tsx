import useCurrentUser from "@/hooks/useCurrentUser";
import { auth, db } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import {
  collection,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface UsernameModalProps {
  isOpen: boolean;
  closeModal: () => void;
  uid: string;
}

const UsernameModal = ({ isOpen, closeModal, uid }: UsernameModalProps) => {
  const [username, setUsername] = useState("");

  // console.log(uid);

  const onSubmit = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("username"));
      const [users] = useCollectionData(q);
      const usernameExists = users?.filter(
        (user) => user.username === username
      );

      if (usernameExists) {
        alert("That username already exists! Pick another one");
        setUsername("");
      } else {
        await updateDoc(doc(db, "users", uid), {
          username: username,
        });
        alert(
          `Username ${username} set. You can change your username in the profile page`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUsername("");
      closeModal();
    }
  };

  const handleCancel = () => {
    setUsername("");
    closeModal();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-20">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="relative flex flex-col justify-center items-center gap-4 bg-zinc-800 px-6 py-12 rounded-md">
              <h2>Create your username</h2>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="text-xl w-full bg-inherit outline-none border-2 border-zinc-400/50 px-2 py-1 rounded-md"
              />
              <div className="flex gap-2">
                <button
                  className="border-2 border-zinc-700 w-24 hover:border-zinc-700/70 py-2 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="border-2 border-zinc-700 w-24 hover:border-zinc-700/70 py-2 rounded-md"
                  onClick={onSubmit}
                  disabled={!username || username === ""}
                >
                  Save
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default UsernameModal;
