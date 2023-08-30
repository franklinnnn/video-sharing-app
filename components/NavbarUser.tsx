"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { auth } from "@/utils/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import LoginModal from "./Modals/LoginModal";

const NavbarUser = () => {
  const user = useCurrentUser();
  const router = useRouter();

  const [openLogin, setOpenLogin] = useState(false);

  const handleUpload = () => {
    if (!user) {
      setOpenLogin(true);
    } else {
      router.push("/upload");
    }
  };

  const handleLogout = () => {
    auth.signOut();
    alert("signed out");
    console.log(user);
    router.push("/");
  };

  return (
    <div className="col-span-1 justify-end items-end">
      <div className="flex justify-end gap-2 w-full">
        <button
          onClick={handleUpload}
          className="flex justify-center items-center gap-2 border-2 border-fuchsia-500  py-2 rounded-lg w-36 px-2"
        >
          <AiOutlinePlus size={20} /> Upload
        </button>

        {user ? (
          <div className="flex items-center justify-center gap-4">
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
            className="bg-fuchsia-500 py-2 rounded-lg w-36 px-2"
          >
            Login
          </button>
        )}
      </div>

      {/* <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        className="relative z-20"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <LoginModal
              isOpen={openLogin}
              closeModal={() => setOpenLogin(false)}
            />
          </Dialog.Panel>
        </div>
      </Dialog> */}

      <LoginModal isOpen={openLogin} closeModal={() => setOpenLogin(false)} />
    </div>
  );
};

export default NavbarUser;
