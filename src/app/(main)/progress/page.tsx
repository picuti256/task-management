"use client";

import Tasks from "@/app/components/Tasks";
import { useGlobalContext } from "@/context/GlobalContext";

const Progress = () => {
  const { incompletedTasks } = useGlobalContext();
  return (
    <div className="h-full w-full items-center justify-between">
      <Tasks title="Tasks in progress" tasks={incompletedTasks} />
    </div>
  );
};

export default Progress;
