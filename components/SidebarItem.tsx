import useCurrentUser from "@/hooks/useCurrentUser";
import { SidebarItemProps } from "@/types";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useCallback } from "react";
import { BsDot } from "react-icons/bs";

const SidebarItem = ({
  label,
  icon: Icon,
  activeIcon: ActiveIcon,
  href,
  activeSegment,
  alert,
  openModal,
}: SidebarItemProps) => {
  const { currentUser } = useCurrentUser();
  const activePage = useSelectedLayoutSegment();
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
      className={`relative flex flex-row justify-start items-center gap-4 text-xl mx-2 px-4 py-2 hover:bg-gray-1/50 rounded-md object-fit hover:cursor-pointer ${
        activePage === activeSegment ? "font-semibold" : "font-normal"
      }`}
    >
      {activePage === activeSegment ? (
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
