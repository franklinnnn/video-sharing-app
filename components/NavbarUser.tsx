"use client";
import { auth } from "@/utils/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import LoginModal from "./Modals/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { Menu } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import useCurrentUser from "@/hooks/useCurrentUser";
import ThemeButton from "./ThemeButton";

const NavbarUser = () => {
  const { user, loading, error } = useAuth();
  const { currentUser } = useCurrentUser();

  const router = useRouter();

  const [openLogin, setOpenLogin] = useState(false);
  const [href, setHref] = useState("");

  const menuRef = useRef<any>(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const goToUpload = () => {
    if (!user) {
      setOpenLogin(true);
      setHref("upload");
    } else {
      router.push("/upload");
      setHref("");
    }
  };

  const handleLogout = () => {
    auth.signOut();
    router.push("/");
    alert("signed out");
  };

  // var timeout:number;
  // const timeoutDuration = 200;

  // const toggleMenu = (open: any) => {
  //   setOpenUserMenu((openUserMenu) => !openUserMenu);
  //   menuRef?.current?.click();
  // };
  // const onHover = (open: any, action: any) => {
  //   if(!open && !openUserMenu && action === "onMouseEnter") || (open && openUserMenu && action === "onMouseLeave") {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
  //   }
  // }
  // const handleClick = (open:any) => {
  //   setOpenUserMenu(!open);
  //   clearTimeout(timeout);
  // }
  // const handleClickOutside = (event:any) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //     event.stopPropagation()
  //   }
  // }
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside)

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside)
  //   }
  // })

  return (
    <div className="col-span-2 justify-end items-end w-full">
      <div className="flex justify-end gap-2 w-full">
        <button
          onClick={goToUpload}
          className="flex justify-center items-center gap-2 border-2 border-primary text-main-dark py-2 rounded-lg h-12 w-12 md:w-36 px-2 font-semibold dark:text-main-light dark:border-zinc-800 dark:bg-zinc-900 hover:dark:bg-zinc-800/40 hover:bg-primary hover:text-main-light transition"
        >
          <AiOutlinePlus size={20} />{" "}
          <span className="hidden md:block">Upload</span>
        </button>

        {user ? (
          <div className="text-main-dark dark:bg-main-dark dark:text-main-light">
            <Menu>
              <Menu.Button>
                <div className="flex items-center justify-center gap-4 h-12 w-12">
                  <Image
                    src={user?.photoURL as string}
                    width={52}
                    height={52}
                    alt={user?.displayName as string}
                    className="object-fit rounded-full hover:cursor-pointer border-[3px] border-primary dark:border-main-light"
                    onClick={() => setOpenUserMenu(true)}
                  />
                </div>
                {/* <BsThreeDotsVertical /> */}
              </Menu.Button>
              <div className="absolute top-16 right-10 w-44 z-10">
                <Menu.Items>
                  <div className="flex flex-col bg-main-light dark:bg-main-dark rounded-md border-2 border-primary/10 dark:border-main-light/20">
                    <Menu.Item>
                      <button
                        onClick={() => router.push(`${currentUser.username}`)}
                        className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10"
                      >
                        <HiOutlineUser size={22} />
                        <span>Profile</span>
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={() => ""}
                        className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10"
                      >
                        <ThemeButton />
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10 border-t border-primary/20 dark:border-main-light/20"
                      >
                        <TbLogout size={24} className="pl-1" />
                        <span>Logout</span>
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </div>
            </Menu>
          </div>
        ) : (
          <button
            onClick={() => setOpenLogin(true)}
            className="bg-primary text-main-light py-2 rounded-lg w-36 px-2"
          >
            Login
          </button>
        )}
      </div>

      <LoginModal
        isOpen={openLogin}
        closeModal={() => setOpenLogin(false)}
        href={href}
      />
    </div>
  );
};

export default NavbarUser;
