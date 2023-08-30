import { db, storage } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

interface DeletePostModalProps {
  isOpen: boolean;
  closeModal: () => void;
  postId: string;
}

const DeletePostModal = ({
  isOpen,
  closeModal,
  postId,
}: DeletePostModalProps) => {
  const handleDeletePost = async () => {
    await deleteDoc(doc(db, "posts", postId));
    await listAll(ref(storage, `videos/${postId}`))
      .then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    alert("post deleted");
    location.reload();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-20">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="relative flex flex-col justify-center items-center gap-4 bg-zinc-800 px-6 py-12 rounded-md">
              <AiFillCloseCircle
                size={30}
                className="absolute right-2 top-2 hover:cursor-pointer"
                onClick={closeModal}
              />
              <h2>Confirm delete post?</h2>
              <div className="flex gap-2">
                <button
                  className="border-2 border-zinc-700 w-24 hover:border-zinc-700/70 py-2 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="border-2 border-zinc-700 w-24 hover:border-zinc-700/70 py-2 rounded-md"
                  onClick={handleDeletePost}
                >
                  Delete
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default DeletePostModal;
