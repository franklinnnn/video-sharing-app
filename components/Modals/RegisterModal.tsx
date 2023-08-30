import { auth, db } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import { FcGoogle } from "react-icons/fc";
import { Dialog } from "@headlessui/react";
import { AiFillCloseCircle } from "react-icons/ai";

interface RegisterModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const RegisterModal = ({ isOpen, closeModal }: RegisterModalProps) => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const [openRegister, setOpenRegister] = useState(false);
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    const { user } = await signInWithPopup(auth, provider);
    const { providerData, uid } = user;

    await setDoc(doc(db, "users", uid), {
      displayName: providerData[0].displayName,
      username: "",
      email: providerData[0].email,
      photoURL: providerData[0].photoURL,
      providerId: providerData[0].providerId,
      uid: uid,
      bio: "",
      website: "",
    });

    alert("signed up success");
  };

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-20">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="relative flex justify-center items-center bg-zinc-800 w-60 h-60 rounded-md">
              <AiFillCloseCircle
                size={30}
                className="absolute right-2 top-2 hover:cursor-pointer"
                onClick={closeModal}
              />
              <button
                onClick={onSubmit}
                className="flex justify-center items-center gap-2 bg-black/60 p-4 rounded-md z-10"
              >
                <FcGoogle />
                Sign in with Google
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default RegisterModal;
