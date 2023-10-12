"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import React, { useState } from "react";
import {
  AiFillBell,
  AiFillHome,
  AiFillPlusCircle,
  AiOutlineBell,
  AiOutlineHome,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { HiUser, HiOutlineUser } from "react-icons/hi";
import NavbarMenuItem from "./NavbarMenuItem";
import { PiMagnifyingGlass, PiMagnifyingGlassFill } from "react-icons/pi";
import LoginModal from "./Modals/LoginModal";

const NavbarMenu = () => {
  const { currentUser } = useCurrentUser();
  const [openLogin, setOpenLogin] = useState(false);

  const navbarItems = [
    {
      label: "Home",
      icon: AiOutlineHome,
      activeIcon: AiFillHome,
      href: "/",
      activeSegment: null,
    },
    {
      label: "Search",
      icon: PiMagnifyingGlass,
      activeIcon: PiMagnifyingGlassFill,
      href: "/search",
      activeSegment: "search",
    },
    {
      label: "Upload",
      icon: AiOutlinePlusCircle,
      activeIcon: AiFillPlusCircle,
      href: "/upload",
      activeSegment: "upload",
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
    <section className="fixed bottom-0 left-0 md:relative bg-main-light dark:bg-main-dark flex justify-evenly col-span-2 w-full h-12">
      {navbarItems.map((item) => (
        <NavbarMenuItem
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

      <LoginModal
        isOpen={openLogin}
        closeModal={() => setOpenLogin(false)}
        href="/"
      />
    </section>
  );
};

export default NavbarMenu;
