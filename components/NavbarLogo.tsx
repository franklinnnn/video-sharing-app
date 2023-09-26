"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NavbarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="col-span-2 flex gap-1 justify-center items-center hover:cursor-pointer w-full"
    >
      <Image src="/icon.png" width={40} height={40} alt="Logo" />
      <span className="font-display font-extrabold text-3xl text-primary md:block hidden">
        Vidly
      </span>
    </div>
  );
};

export default NavbarLogo;
