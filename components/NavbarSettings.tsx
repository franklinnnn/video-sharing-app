"use client";
import { auth } from "@/utils/firebase";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiMenu4Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import ThemeButton from "./ThemeButton";
import { TbLogin, TbLogout } from "react-icons/tb";
import LoginModal from "./Modals/LoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const NavbarSettings = () => {
  const { currentUser } = useCurrentUser();
  const [openLogin, setOpenLogin] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
    router.push("/");
    toast.success("You have been logged out", {
      onClose: () => location.reload(),
    });
  };
  return (
    <div className="col-span-1 flex justify-end items-center w-full">
      <Menu>
        <div className="flex justify-center text-main-dark dark:bg-main-dark dark:text-main-light">
          <Menu.Button className="hover:bg-primary/10 hover:dark:bg-zinc-200/10 p-2 rounded-full transition">
            <RiMenu4Fill size={24} />
          </Menu.Button>
          <Menu.Items>
            <div className="absolute top-16 right-[16px] mt-2 w-44 z-10 flex flex-col bg-main-light dark:bg-main-dark rounded-md border-2 border-primary/10 dark:border-main-light/20">
              <Menu.Item>
                <div
                  onClick={() => router.push("/about")}
                  className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10 hover:cursor-pointer"
                >
                  <AiOutlineInfoCircle size={22} /> <span>About</span>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div>
                  <ThemeButton />
                </div>
              </Menu.Item>
              <Menu.Item>
                {currentUser.uid ? (
                  <button
                    onClick={handleLogout}
                    className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10 border-t border-primary/20 dark:border-main-light/20"
                  >
                    <TbLogout size={24} className="pl-1" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenLogin(true)}
                    className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10 border-t border-primary/20 dark:border-main-light/20"
                  >
                    <TbLogin size={24} className="pl-1" />
                    <span>Login</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </div>
      </Menu>

      <LoginModal
        isOpen={openLogin}
        closeModal={() => setOpenLogin(false)}
        href="/"
      />
    </div>
  );
};

export default NavbarSettings;
