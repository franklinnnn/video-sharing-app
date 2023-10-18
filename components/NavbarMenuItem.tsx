import useCurrentUser from "@/hooks/useCurrentUser";
import { SidebarItemProps } from "@/types";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import React, { useCallback, useState } from "react";
import { BsDot } from "react-icons/bs";
import LoginModal from "./Modals/LoginModal";
import Image from "next/image";

const NavbarMenuItem = ({
  label,
  icon: Icon,
  activeIcon: ActiveIcon,
  href,
  activeSegment,
  alert,
}: SidebarItemProps) => {
  const { currentUser } = useCurrentUser();
  const activePage = useSelectedLayoutSegment();
  const router = useRouter();
  const [openLogin, setOpenLogin] = useState(false);

  const handleClick = useCallback(() => {
    if (currentUser.uid || href === "/" || href === "/search") {
      router.push(href);
    } else {
      setOpenLogin(true);
      // console.log("open login modal");
    }
  }, [router, href, currentUser, setOpenLogin]);

  return (
    <>
      <button
        onClick={handleClick}
        className={`relative flex flex-row justify-start items-center gap-4 text-xl mx-1 px-2 md:mx-2 md:px-4 py-2 hover:bg-primary/10 hover:dark:bg-main-light/10 rounded-full md:rounded-md md:object-fit hover:cursor-pointer group ${
          activePage === activeSegment
            ? "font-semibold dark:text-main-light"
            : "font-normal dark:text-zinc-200/70"
        }`}
      >
        {activePage === activeSegment ? (
          <>
            {label === "Profile" && currentUser?.photoURL ? (
              <Image
                src={currentUser?.photoURL}
                width={34}
                height={34}
                alt="User profile photo"
                className="border-2 border-primary dark:border-zinc-200 rounded-full"
              />
            ) : (
              <ActiveIcon
                size={32}
                className="text-primary dark:text-main-light"
              />
            )}
          </>
        ) : (
          <>
            {label === "Profile" && currentUser?.photoURL ? (
              <Image
                src={currentUser?.photoURL}
                width={34}
                height={34}
                alt="User profile photo"
                className="border-2 border-primary/20 dark:border-zinc-200/20 rounded-full"
              />
            ) : (
              <Icon
                size={32}
                className="text-primary/50 dark:text-main-light/50"
              />
            )}
          </>
        )}
        {alert ? (
          <BsDot size={60} className="text-red-500 absolute -top-4 left-1" />
        ) : null}
        {/* <span className="absolute left-12 top-3 justify-center items-center bg-primary text-main-light text-base rounded-md px-2 hidden group-hover:block z-10">
          {label}
        </span> */}
      </button>

      <LoginModal
        isOpen={openLogin}
        closeModal={() => setOpenLogin(false)}
        href={href}
      />
    </>
  );
};

export default NavbarMenuItem;
