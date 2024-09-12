"use client";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import Header from "../components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  return (
    <div className={`h-screen bg-primary text-white font-primary`}>
      <Toaster />
      {path !== "/login" && <Header />}
      {children}
    </div>
  );
}
