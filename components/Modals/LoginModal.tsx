import { ModalProps } from "@/types";
import { auth, db } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const LoginModal = ({ isOpen, closeModal, href }: ModalProps) => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const { theme } = useTheme();

  const [uid, setUid] = useState("");
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
        router.push(href === "/undefined" ? userSnap.data().username : href);
        toast.success("Signed in successfully");
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
          website: null,
        });
        toast.success("Signed in successfully");
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
        <div
          className="fixed inset-0 bg-primary/20 dark:bg-zinc-200/20"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <div className="relative flex flex-col justify-center items-center gap-6 bg-main-light dark:bg-main-dark w-72 md:w-96 h-72 rounded-md">
              <AiFillCloseCircle
                size={30}
                className="absolute right-2 top-2 hover:cursor-pointer text-primary/30 hover:text-primary/40 dark:text-zinc-200/30 hover:dark:text-zinc-200/40 transition"
                onClick={closeModal}
              />
              <div className="flex justify-center">
                {theme === "light" ? (
                  <Image
                    src="/icon-light.png"
                    width={35}
                    height={35}
                    alt="Logo"
                  />
                ) : (
                  <Image
                    src="/icon-dark.png"
                    width={35}
                    height={35}
                    alt="Logo"
                  />
                )}
                <span className="font-display font-extrabold italic text-3xl text-primary dark:text-zinc-200">
                  Vidiot
                </span>
              </div>
              <button
                onClick={onSubmit}
                className="flex justify-center items-center gap-2 bg-primary text-main-light font-semibold hover:bg-primary/80 p-4 rounded-md z-10"
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

export default LoginModal;
