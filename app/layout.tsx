import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

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
      <body className="bg-main-light text-main-dark">
        <AuthProvider>
          <div className="container grid grid-cols-4 justify-center mt-16 mx-auto max-w-3xl">
            <div className="col-span-1 flex justify-center">
              <Sidebar />
            </div>
            <div className="col-span-3 w-full px-2 py-6">{children}</div>
          </div>
          <Navbar />
        </AuthProvider>
      </body>
    </html>
  );
}
