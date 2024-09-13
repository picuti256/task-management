"use client";
import React from "react";
import { GlobalProvider, useGlobalContext } from "@/context/GlobalContext";
import { ModalProvider } from "../components/ui/animated-modal";
import Tasks from "../components/Tasks";
import NoNewTask from "../components/NoNewTask";

const Home = () => {
  const { tasks } = useGlobalContext();

  return (
    <GlobalProvider>
      <ModalProvider>
        <div className="h-full w-full items-center justify-between">
          <Tasks title="All Tasks" tasks={tasks} />
        </div>
      </ModalProvider>
    </GlobalProvider>
  );
};

export default Home;
