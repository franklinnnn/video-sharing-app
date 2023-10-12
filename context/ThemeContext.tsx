"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type ThemeProviderProps = { children: ReactNode };
const Theme = ({ children }: ThemeProviderProps) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default Theme;
