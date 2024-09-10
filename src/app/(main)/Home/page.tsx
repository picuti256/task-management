// app/Home.tsx
"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarMenu } from "@/app/components/Sidebar";
import Dashboard from "@/app/components/Dashboard";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    if (firstName && lastName) {
      setFullName(`${firstName} ${lastName}`);
    }
  }, []);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <SidebarMenu open={open} setOpen={setOpen} fullName={fullName} />
      <Dashboard />
    </div>
  );
};



export default Home;
