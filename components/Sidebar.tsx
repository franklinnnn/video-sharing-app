"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { HiUser, HiOutlineUser } from "react-icons/hi";
import SidebarItem from "./SidebarItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import LoginModal from "./Modals/LoginModal";
import {
  AiFillBell,
  AiFillHome,
  AiOutlineBell,
  AiOutlineHome,
} from "react-icons/ai";

const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  const [openLogin, setOpenLogin] = useState(false);

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
      alert: currentUser?.hasNotification,
      activeSegment: "notifications",
    },
    // {
    //   label: "Explore",
    //   icon: MdOutlineExplore,
    //   activeIcon: MdExplore,
    //   href: "/explore",
    //   activeSegment: "explore",
    // },
    {
      label: "Profile",
      icon: HiOutlineUser,
      activeIcon: HiUser,
      href: `/${currentUser.username}`,
      activeSegment: `${currentUser.username}`,
    },
  ];

  return (
    <div className="fixed flex flex-col gap-2 pt-12 z-1">
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
