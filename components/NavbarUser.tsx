"use client";
import { auth, db } from "@/utils/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import LoginModal from "./Modals/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const NavbarUser = () => {
  const { user, loading, error } = useAuth();

  const router = useRouter();

  const [openLogin, setOpenLogin] = useState(false);
  const [href, setHref] = useState("");

  const handleUpload = () => {
    if (!user) {
      setOpenLogin(true);
      setHref("upload");
    } else {
      router.push("/upload");
      setHref("");
    }
  };

  const handleLogout = () => {
    auth.signOut();
    router.push("/");
    alert("signed out");
  };

  return (
    <div className="col-span-1 justify-end items-end">
      <div className="flex justify-end gap-2 w-full">
        <button
          onClick={handleUpload}
          className="flex justify-center items-center gap-2 border-2 border-primary text-primary-dark py-2 rounded-lg w-36 px-2 font-semibold hover:bg-primary hover:text-white transition"
        >
          <AiOutlinePlus size={20} /> Upload
        </button>

        {user ? (
          <div className="flex items-center justify-center gap-4 w-14">
            <Image
              src={user?.photoURL as string}
              width={50}
              height={50}
              alt={user?.displayName as string}
              className="object-fit rounded-full hover:cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <button
            onClick={() => setOpenLogin(true)}
            className="bg-primary text-white py-2 rounded-lg w-36 px-2"
          >
            Login
          </button>
        )}
      </div>

      <LoginModal
        isOpen={openLogin}
        closeModal={() => setOpenLogin(false)}
        href={href}
      />
    </div>
  );
};

export default NavbarUser;
