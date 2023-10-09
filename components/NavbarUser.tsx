"use client";
import { auth } from "@/utils/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import LoginModal from "./Modals/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { Menu } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { TbLogin, TbLogout } from "react-icons/tb";
import { RiMenu4Fill } from "react-icons/ri";
import useCurrentUser from "@/hooks/useCurrentUser";
import ThemeButton from "./ThemeButton";
import LoginButton from "./LoginButton";

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

  return (
    <div className="col-span-1 flex justify-end items-center w-full">
      {/* <div className="flex justify-end items-center gap-2 w-full bg-blue-500"> */}

      <div className="flex justify-center text-main-dark dark:bg-main-dark dark:text-main-light">
        <Menu>
          <Menu.Button className="hover:bg-primary/10 hover:dark:bg-zinc-200/10 p-2 rounded-full transition">
            <RiMenu4Fill size={24} />
          </Menu.Button>
          <div className="absolute top-16 right-[16px] mt-2 w-44 z-10">
            <Menu.Items>
              <div className="flex flex-col bg-main-light dark:bg-main-dark rounded-md border-2 border-primary/10 dark:border-main-light/20">
                <Menu.Item>
                  <button
                    onClick={() => router.push(`${currentUser.username}`)}
                    className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10"
                  >
                    <AiOutlineInfoCircle size={22} />
                    <span>About</span>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <ThemeButton />
                </Menu.Item>
                <Menu.Item>
                  {/* {user ? (
                <button
                  onClick={() => setOpenLogin(true)}
                  className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10 border-t border-primary/20 dark:border-main-light/20"
                >
                  <TbLogin size={24} className="pl-1" />
                  <span>Login</span>
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10 border-t border-primary/20 dark:border-main-light/20"
                >
                  <TbLogout size={24} className="pl-1" />
                  <span>Logout</span>
                </button>
              )} */}
                  <LoginButton
                    openModal={() => setOpenLogin(true)}
                    handleLogout={handleLogout}
                  />
                </Menu.Item>
              </div>
            </Menu.Items>
          </div>
        </Menu>
      </div>

      {/* {user ? (
        <div className="flex justify-center text-main-dark dark:bg-main-dark dark:text-main-light">
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
            </Menu.Button>
            <div className="absolute top-16 right-[16px] mt-2 w-44 z-10">
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
          className="flex justify-center items-center gap-2 border-2 border-primary text-main-dark py-2 rounded-lg h-12 w-12 md:w-20 px-2 font-semibold dark:text-main-light dark:border-zinc-200 hover:bg-primary hover:text-main-light hover:dark:border-primary transition"
        >
          Login
        </button>
      )} */}
      {/* </div> */}

      <LoginModal
        isOpen={openLogin}
        closeModal={() => setOpenLogin(false)}
        href={href}
      />
    </div>
  );
};

export default NavbarUser;
