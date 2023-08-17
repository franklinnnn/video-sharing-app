"use client";

import { auth } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import Login from "./Login";

const Sidebar = () => {
  const [user, loading] = useAuthState(auth);
  const [openLogin, setOpenLogin] = useState(false);

  const router = useRouter();

  const sidebarItems = [
    {
      label: "Home",
      icon: <BsHouseFill />,
      href: "/",
    },
    {
      label: "Explore",
      icon: <MdExplore />,
      href: "/explore",
    },
    {
      label: "Profile",
      icon: <FaUser />,
      href: `/users/${user?.uid}`,
    },
  ];

  return (
    <div className="fixed pt-6 h-full z-1">
      {sidebarItems.map((item) => {
        const handleLink = useCallback(() => {
          router.push(`${item.href}`);
        }, [router, item.href]);
        return (
          <div
            onClick={handleLink}
            key={item.href}
            className="flex flex-row justify-start items-center gap-4 text-xl mx-2 px-4 py-2 hover:bg-zinc-800 rounded-md object-fit hover:cursor-pointer"
          >
            <span className="text-2xl">{item.icon}</span>{" "}
            <span className="hidden lg:block">{item.label}</span>
          </div>
        );
      })}

      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        className="relative z-20"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <Login
              isOpen={openLogin}
              closeModal={() => setOpenLogin(false)}
              href={"/users"}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Sidebar;
