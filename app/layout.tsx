import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import Theme from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Vidiot - Video Sharing App",
  description: "Share videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <Theme>
          <body className="bg-main-light text-main-dark dark:bg-main-dark dark:text-main-light ">
            <Navbar />
            {children}
          </body>
        </Theme>
      </AuthProvider>
    </html>
  );
}
