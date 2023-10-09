import useCurrentUser from "@/hooks/useCurrentUser";
import { SidebarItemProps } from "@/types";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import React, { useCallback } from "react";
import { BsDot } from "react-icons/bs";

const NavbarMenuItem = ({
  label,
  icon: Icon,
  activeIcon: ActiveIcon,
  href,
  activeSegment,
  alert,
  openModal,
}: SidebarItemProps) => {
  const { currentUser } = useCurrentUser();
  const activePage = useSelectedLayoutSegment();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (currentUser.uid) {
      router.push(href);
    } else {
      openModal();
      console.log("open login modal");
    }
  }, [router, href, currentUser, openModal]);
  return (
    <button
      onClick={handleClick}
      className={`relative flex flex-row justify-start items-center gap-4 text-xl mx-1 px-2 md:mx-2 md:px-4 py-2 hover:bg-primary/10 hover:dark:bg-main-light/10 rounded-full md:rounded-md md:object-fit hover:cursor-pointer ${
        activePage === activeSegment
          ? "font-semibold dark:text-main-light"
          : "font-normal dark:text-zinc-200/70"
      }`}
    >
      {activePage === activeSegment ? (
        <ActiveIcon size={32} className="text-primary dark:text-main-light" />
      ) : (
        <Icon size={32} className="text-primary/50 dark:text-main-light/50" />
      )}
      {alert ? (
        <BsDot size={60} className="text-red-500 absolute -top-4 left-1" />
      ) : null}
      {/* <span className="hidden md:block">{label}</span> */}
    </button>
  );
};

export default NavbarMenuItem;
