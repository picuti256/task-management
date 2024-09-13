"use client";

import { ScrollArea } from "@/app/components/ui/scroll-area";
import FormModal from "../FormModal";
import TaskItem from "../TaskItem";
import { useGlobalContext } from "@/context/GlobalContext";
import { helix } from "ldrs";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  tasks: any[];
}

const Tasks: React.FC<Props> = ({ title, tasks }) => {
  const { isLoading } = useGlobalContext();
  const path = usePathname();

  return (
    <section className="py-10 w-full mx-auto px-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {path === "/" && <FormModal />}
      </div>
      {tasks.length === 0 && path === "/" && !isLoading && (
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
        <ScrollArea className="h-[40rem] pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                isCompleted={task.isCompleted}
                isProgress={task.isProgress}
                repository={task.repository}
                isImportant={task.isImportant}
                projectName={task.projectName}
                index={index}
                user={task.user}
                userId={task.userId}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </section>
  );
};

export default Tasks;
