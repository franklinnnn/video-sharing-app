import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Video Sharing App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-900">
        <Navbar />
        <div className="container grid grid-cols-4 justify-center mt-16 mx-auto max-w-2xl">
          <div className="col-span-1 pr-4 justify-center items-start ">
            <Sidebar />
          </div>
          <div className="col-span-3 w-full px-2 py-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
