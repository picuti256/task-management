"use client";

import Tasks from "@/app/components/Tasks";
import { useGlobalContext } from "@/context/GlobalContext";

const Done = () => {
  const { completedTasks } = useGlobalContext();
  return (
    <div className="h-full w-full items-center justify-between">
      <Tasks title="Completed Tasks" tasks={completedTasks} />
    </div>
  );
};

export default Done;
