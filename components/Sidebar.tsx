"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import SidebarItem from "./SidebarItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import LoginModal from "./Modals/LoginModal";

const Sidebar = () => {
  const { currentUser } = useCurrentUser();
  const [fetchedUser, setFetchedUser] = useState({} as any);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    if (currentUser?.uid) {
      getUser();
    }
  }, [currentUser?.uid]);

  const sidebarItems = [
    {
      label: "Home",
      icon: BsHouseFill,
      href: "/",
    },
    {
      label: "Notifications",
      icon: BsBellFill,
      href: "/notifications",
      alert: fetchedUser?.hasNotification,
    },
    {
      label: "Explore",
      icon: MdExplore,
      href: "/explore",
    },
    {
      label: "Profile",
      icon: FaUser,
      href: `/${fetchedUser.username}`,
    },
  ];

  const getUser = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUser?.uid)
    );
    const usersSnapshot = await getDocs(q);
    usersSnapshot.forEach((doc) => {
      setFetchedUser(doc.data());
    });
  };

  return (
    <div className="fixed pt-6 h-full z-1">
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          href={item.href}
          alert={item.alert}
          openModal={() => setOpenLogin(true)}
        />
      ))}

      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        className="relative z-20"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel>
            <LoginModal
              isOpen={openLogin}
              closeModal={() => setOpenLogin(false)}
              href={"/users"}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Sidebar;
