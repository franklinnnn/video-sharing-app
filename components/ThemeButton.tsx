"use client";

import { useTheme } from "next-themes";
import React from "react";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "Light Mode" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeButton;
