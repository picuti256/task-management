"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarMenu } from "@/app/components/Sidebar";
import Dashboard from "@/app/components/Dashboard";
import { GlobalProvider } from "@/context/GlobalContext";
import { ModalProvider } from "../components/ui/animated-modal";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      <GlobalProvider>
        <ModalProvider>
          <Dashboard />
        </ModalProvider>
      </GlobalProvider>
    </div>
  );
};

export default Home;
