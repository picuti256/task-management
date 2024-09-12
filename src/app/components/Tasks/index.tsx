"use client"

import { ScrollArea } from "@/app/components/ui/scroll-area";
import FormModal from "../FormModal";
import TaskItem from "../TaskItem";
import { useGlobalContext } from "@/context/GlobalContext";
import { helix } from "ldrs";

interface Props {
  title: string;
  tasks: any[];
}

const Tasks: React.FC<Props> = ({ title, tasks }) => {
  const { isLoading } = useGlobalContext();


  return (
    <section className="py-10 w-full mx-auto h-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <FormModal />
      </div>
      {!isLoading ? (
        <ScrollArea className="h-[50rem]">
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
              />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <l-helix size="100" speed="2.5" color="purple"></l-helix>
        </div>
      )}
    </section>
  );
};

export default Tasks;
