import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { TbLogin, TbLogout } from "react-icons/tb";

type LoginButtonProps = {
  openModal: () => void;
  handleLogout: () => void;
};

const LoginButton = ({ openModal, handleLogout }: LoginButtonProps) => {
  const { user, loading, error } = useAuth();

  if (user) {
    return (
      <button
        onClick={openModal}
        className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10 border-t border-primary/20 dark:border-main-light/20"
      >
        <TbLogin size={24} className="pl-1" />
        <span>Login</span>
      </button>
    );
  } else {
    return (
      <button
        onClick={handleLogout}
        className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10 border-t border-primary/20 dark:border-main-light/20"
      >
        <TbLogout size={24} className="pl-1" />
        <span>Logout</span>
      </button>
    );
  }
};

export default LoginButton;
