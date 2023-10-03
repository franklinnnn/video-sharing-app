"use client";

import { useTheme } from "next-themes";
import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? (
        <div className="flex items-center gap-4">
          <BiMoon size={22} /> Dark Mode
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <BiSun size={22} /> Light Mode
        </div>
      )}
    </button>
  );
};

export default ThemeButton;
