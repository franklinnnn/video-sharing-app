"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type ProviderProps = { children: ReactNode };
const Providers = ({ children }: ProviderProps) => {
  return (
    <div>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </div>
  );
};

export default Providers;
