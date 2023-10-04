"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type ProviderProps = { children: ReactNode };
const Providers = ({ children }: ProviderProps) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default Providers;
