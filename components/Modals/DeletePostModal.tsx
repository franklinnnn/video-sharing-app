import { ModalProps } from "@/types";
import { db, storage } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    toast.success("Comment deleted ❌");
    location.reload();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-20">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="relative flex flex-col justify-center items-center gap-4 w-72 md:w-96 h-72 bg-white px-6 py-12 rounded-md">
              <AiFillCloseCircle
                size={30}
                className="absolute right-2 top-2 hover:cursor-pointer text-gray-2 hover:text-gray-2/75 transition"
                onClick={closeModal}
              />
              <h2>Delete your post?</h2>
              <div className="flex gap-2">
                <button
                  className="bg-primary hover:bg-primary/75 text-white w-24 py-2 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500/90 hover:bg-red-500 text-white w-24 py-2 rounded-md"
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
