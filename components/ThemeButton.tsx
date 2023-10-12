"use client";

import { useTheme } from "next-themes";
import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex justify-start items-center gap-4 w-full py-2 px-4 hover:bg-primary/10 hover:dark:bg-main-light/10 hover:cursor-pointer"
    >
      {theme === "light" ? (
        <span className="flex items-center gap-4">
          <BiMoon size={22} /> Dark Mode
        </span>
      ) : (
        <span className="flex items-center gap-4">
          <BiSun size={22} /> Light Mode
        </span>
      )}
    </div>
  );
};

export default ThemeButton;
