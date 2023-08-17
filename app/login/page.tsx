"use client";

import React from "react";

import bgimg from "@/public/bgimg.jpg";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "@/utils/firebase";
import { useRouter } from "next/navigation";

const Login = () => {
  const firebaseAuth = getAuth(firebaseApp);

  const provider = new GoogleAuthProvider();

  const firebaseDb = getFirestore(firebaseApp);

  const router = useRouter();

  const login = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData } = user;

    // localStorage.setItem("user", JSON.stringify(providerData));
    // localStorage.setItem("accessToken", JSON.stringify(refreshToken));

    await setDoc(
      doc(firebaseDb, "users", providerData[0].uid),
      providerData[0]
    );

    router.push("/");
  };
  return (
    <div className="relative flex justify-center items-center w-screen h-screen">
      <Image
        src={bgimg}
        fill
        alt="Background Image"
        className="object-background object-cover"
      />
      <div className="absolute top-0 left-0 flex justify-center align-center  w-screen h-screen bg-black/60"></div>
      <div className="z-10">
        <button
          onClick={login}
          className="flex justify-center items-center gap-2 bg-black/60 p-4 rounded-md"
        >
          <FcGoogle />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
