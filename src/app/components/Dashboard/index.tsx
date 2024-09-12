"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import Tasks from "../Tasks";

const Dashboard = () => {
  const { tasks } = useGlobalContext();

  return (
    <div className="flex flex-1">
      <div className="px-10 bg-[#1c1c22] text-white flex flex-col gap-2 flex-1 w-full h-full">
        <Tasks title="All Tasks" tasks={tasks} />
      </div>
    </div>
  );
};

export default Dashboard;
