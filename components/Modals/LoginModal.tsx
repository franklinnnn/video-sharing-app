import { auth, db } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import UsernameModal from "./UsernameModal";
import { signInUser } from "@/utils";

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LoginModal = ({ isOpen, closeModal }: LoginModalProps) => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const [uid, setUid] = useState("");
  const [openUsername, setOpenUsername] = useState(false);
  const onSubmit = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const { refreshToken, providerData, uid } = user;

      localStorage.setItem("user", JSON.stringify(providerData));
      localStorage.setItem("accessToken", JSON.stringify(refreshToken));

      setUid(uid);
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        if (!userSnap.data().username || userSnap.data().username === "") {
          await updateDoc(userRef, {
            username: providerData[0].displayName
              ?.replace(/\s/g, "")
              .toLowerCase(),
          });
        }
        alert("signed in successfully");
        router.push("/");
        closeModal();
      } else {
        await setDoc(userRef, {
          displayName: providerData[0].displayName,
          username: providerData[0].displayName
            ?.replace(/\s/g, "")
            .toLowerCase(),
          email: providerData[0].email,
          photoURL: providerData[0].photoURL,
          providerId: providerData[0].providerId,
          uid: uid,
          bio: "",
          website: "",
        });
      }
    } catch (error) {
      console.log(error);
      alert(`Something's gone wrong: ${error}`);
    } finally {
      setUid("");
      closeModal();
    }
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
      {/* <UsernameModal
        isOpen={openUsername}
        closeModal={() => setOpenUsername(false)}
        uid={uid}
      /> */}
    </>
  );
};

export default LoginModal;
