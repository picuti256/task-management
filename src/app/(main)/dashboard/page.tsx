"use client";

import PieTasks from "@/app/components/PieTasks";
import TooltipTasks from "@/app/components/TooltipTasks";
import { useGlobalContext } from "@/context/GlobalContext";
import { usePathname } from "next/navigation";

const Done = () => {
  const { completedTasks, isLoading } = useGlobalContext();
  const path = usePathname();
  return (
    <div className="h-full w-full items-center justify-between">
      <section className="py-10 w-full mx-auto px-8 h-full">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold pb-5">Dashboard</h1>
        </div>
        {path === "/" && !isLoading && (
          <div className="flex w-1/4 py-10 bg-[#232329] rounded-xl px-6">
            <p>
              <span className="font-bold">No task created.</span> <br /> Please
              create a new task.
            </p>
          </div>
        )}
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <l-helix size="100" speed="2.5" color="purple"></l-helix>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <PieTasks />
            <TooltipTasks />
          </div>
        )}
      </section>
    </div>
  );
};

export default Done;
