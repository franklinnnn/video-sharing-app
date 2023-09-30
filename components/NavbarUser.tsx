"use client";
import { auth } from "@/utils/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import LoginModal from "./Modals/LoginModal";
import { useAuth } from "@/hooks/useAuth";

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
    <div className="col-span-2 justify-end items-end w-full">
      <div className="flex justify-end gap-2 w-full">
        <button
          onClick={handleUpload}
          className="flex justify-center items-center gap-2 border-2 border-primary text-main-dark py-2 rounded-lg h-12 w-12 md:w-36 px-2 font-semibold hover:bg-primary hover:text-main-light transition"
        >
          <AiOutlinePlus size={20} />{" "}
          <span className="hidden md:block">Upload</span>
        </button>

        {user ? (
          <div className="flex items-center justify-center gap-4 h-12 w-12">
            <Image
              src={user?.photoURL as string}
              width={52}
              height={52}
              alt={user?.displayName as string}
              className="object-fit rounded-full hover:cursor-pointer border-[3px] border-primary"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <button
            onClick={() => setOpenLogin(true)}
            className="bg-primary text-main-light py-2 rounded-lg w-36 px-2"
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
