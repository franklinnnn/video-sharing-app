"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { SidebarItemProps } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { BsDot } from "react-icons/bs";

const SidebarItem = ({
  label,
  icon: Icon,
  activeIcon: ActiveIcon,
  href,
  alert,
  openModal,
}: SidebarItemProps) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const [activePage, setActivePage] = useState("Home");

  const handleClick = useCallback(() => {
    if (!currentUser) {
      openModal();
      console.log("open login modal");
    } else if (href) {
      router.push(href);
      console.log(label);
      setActivePage(label);
    }
  }, [router, href, label, currentUser, openModal]);

  return (
    <div
      onClick={handleClick}
      className="relative flex flex-row justify-start items-center gap-4 text-xl mx-2 px-4 py-2 hover:bg-gray-1 rounded-md object-fit hover:cursor-pointer"
    >
      {activePage === label ? (
        <ActiveIcon size={24} className="text-primary-dark" />
      ) : (
        <Icon size={24} className="text-primary-dark" />
      )}
      {alert ? (
        <BsDot size={60} className="text-red-500 absolute -top-4 left-1" />
      ) : null}
      <span className="hidden md:block">{label}</span>
    </div>
  );
};

export default SidebarItem;
