"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FaRegUser, FaUser } from "react-icons/fa";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { HiUser, HiOutlineUser } from "react-icons/hi";
import SidebarItem from "./SidebarItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import LoginModal from "./Modals/LoginModal";
import {
  AiFillBell,
  AiFillHome,
  AiOutlineBell,
  AiOutlineHome,
} from "react-icons/ai";

const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  const [fetchedUser, setFetchedUser] = useState({} as any);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    if (currentUser?.uid) {
      getUser();
    }
  }, [currentUser?.uid]);

  const sidebarItems = [
    {
      label: "Home",
      icon: AiOutlineHome,
      activeIcon: AiFillHome,
      href: "/",
      activeSegment: null,
    },
    {
      label: "Notifications",
      icon: AiOutlineBell,
      activeIcon: AiFillBell,
      href: "/notifications",
      alert: fetchedUser?.hasNotification,
      activeSegment: "notifications",
    },
    {
      label: "Explore",
      icon: MdOutlineExplore,
      activeIcon: MdExplore,
      href: "/explore",
      activeSegment: "explore",
    },
    {
      label: "Profile",
      icon: HiOutlineUser,
      activeIcon: HiUser,
      href: `/${fetchedUser.username}`,
      activeSegment: `${fetchedUser.username}`,
    },
  ];

  const getUser = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUser?.uid)
    );
    const usersSnapshot = await getDocs(q);
    usersSnapshot.forEach((doc) => {
      setFetchedUser(doc.data());
    });
  };

  return (
    <div className="fixed pt-6 h-full z-1">
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          activeIcon={item.activeIcon}
          href={item.href}
          activeSegment={item.activeSegment}
          alert={item.alert}
          openModal={() => setOpenLogin(true)}
        />
      ))}

      <Dialog
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
              href={"/users"}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Sidebar;
