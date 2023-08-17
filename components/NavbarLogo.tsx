import { useRouter } from "next/navigation";
import React from "react";

const NavbarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="col-span-1 hover:cursor-pointer"
    >
      Logo here
    </div>
  );
};

export default NavbarLogo;
