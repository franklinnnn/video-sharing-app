"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import { SidebarItemProps } from "@/types";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const SidebarItem = ({
  label,
  icon: Icon,
  href,
  openModal,
}: SidebarItemProps) => {
  const currentUser = useCurrentUser();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (!currentUser) {
      openModal();
      console.log("open login modal");
    } else if (href) {
      router.push(href);
    }
  }, [router, href, currentUser, openModal]);

  return (
    <div
      onClick={handleClick}
      className="flex flex-row justify-start items-center gap-4 text-xl mx-2 px-4 py-2 hover:bg-gray-1 rounded-md object-fit hover:cursor-pointer"
    >
      <Icon size={24} className="text-primary-dark" />
      <span className="hidden md:block">{label}</span>
    </div>
  );
};

export default SidebarItem;
