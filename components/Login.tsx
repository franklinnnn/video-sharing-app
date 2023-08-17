"use client";
import { FcGoogle } from "react-icons/fc";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { auth, db, firebaseApp } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";

interface LoginProps {
  isOpen: boolean;
  closeModal: () => void;
  href: string;
}

const Login = ({ isOpen, closeModal, href }: LoginProps) => {
  const firebaseAuth = getAuth(firebaseApp);

  const provider = new GoogleAuthProvider();

  const database = getFirestore(firebaseApp);

  const router = useRouter();

  const login = async () => {
    // const { user } = await signInWithPopup(firebaseAuth, provider);
    // const { refreshToken, providerData } = user;

    // localStorage.setItem("user", JSON.stringify(providerData));
    // localStorage.setItem("accessToken", JSON.stringify(refreshToken));

    // await setDoc(
    //   doc(firebaseDb, "users", providerData[0].uid),
    //   providerData[0]
    // );

    // await signInWithPopup(auth, provider)
    //   .then((result) => {
    //     const user = result.user;
    //     console.log(user.uid);
    //     setDoc(doc(db, "users", user.uid), user.uid)
    //   })
    //   .catch((error) => {
    //     console.log(error.code, error.message);
    //   });

    const { user } = await signInWithPopup(auth, provider);
    const { providerData, uid } = user;

    await setDoc(doc(db, "users", uid), {
      displayName: providerData[0].displayName,
      email: providerData[0].email,
      photoURL: providerData[0].photoURL,
      providerId: providerData[0].providerId,
      uid: uid,
      bio: "",
      website: "",
    });

    closeModal();
    alert("signed in successfully");
    router.push(href);
  };
  return (
    <div className="relative flex justify-center items-center bg-zinc-800 w-60 h-60 rounded-md">
      <AiFillCloseCircle
        size={30}
        className="absolute right-2 top-2 hover:cursor-pointer"
        onClick={closeModal}
      />
      <button
        onClick={login}
        className="flex justify-center items-center gap-2 bg-black/60 p-4 rounded-md z-10"
      >
        <FcGoogle />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
