"use client";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import Header from "../components/Header";
import { usePathname } from "next/navigation";
import { GlobalProvider } from "@/context/GlobalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  return (
    <GlobalProvider>
      <div className={`bg-primary text-white font-primary`}>
        <Toaster />
        {path !== "/login" && <Header />}
        {children}
      </div>
    </GlobalProvider>
  );
}
