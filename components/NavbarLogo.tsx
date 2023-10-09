"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NavbarLogo = () => {
  const { theme } = useTheme();

  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="col-span-1 flex justify-start items-end hover:cursor-pointer w-full"
    >
      {theme === "light" ? (
        <div>
          <Image src="/icon-light.png" width={38} height={38} alt="Logo" />
        </div>
      ) : (
        <div>
          <Image src="/icon-dark.png" width={38} height={38} alt="Logo" />
        </div>
      )}
      <h1 className="font-display font-extrabold italic text-3xl text-main-dark dark:text-main-light md:block hidden">
        Vidiot
      </h1>
    </div>
  );
};

export default NavbarLogo;
