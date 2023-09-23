import { ModalProps } from "@/types";
import { db, storage } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const DeletePostModal = ({ isOpen, closeModal, postId }: ModalProps) => {
  const handleDeletePost = async () => {
    if (postId) {
      await deleteDoc(doc(db, "posts", postId));
    }
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
            <div className="relative flex flex-col justify-center items-center gap-4 w-72 bg-white px-6 py-12 rounded-md">
              <AiFillCloseCircle
                size={30}
                className="absolute right-2 top-2 hover:cursor-pointer"
                onClick={closeModal}
              />
              <h2>Confirm delete post?</h2>
              <div className="flex gap-2">
                <button
                  className="border-2 border-primary-dark w-24 hover:border-gray-2 py-2 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="border-2 border-primary-dark w-24 hover:border-red-500 py-2 rounded-md"
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
