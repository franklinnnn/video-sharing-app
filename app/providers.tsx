"use client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
