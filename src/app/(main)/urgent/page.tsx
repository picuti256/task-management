"use client";

import Tasks from "@/app/components/Tasks";
import { useGlobalContext } from "@/context/GlobalContext";

const Urgent = () => {
  const { importantTasks } = useGlobalContext();
  return (
    <div className="h-full w-full items-center justify-between">
      <Tasks title="Urgent" tasks={importantTasks} />
    </div>
  );
};

export default Urgent;
