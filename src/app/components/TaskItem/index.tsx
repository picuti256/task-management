"use client";

import { CiEdit, CiTrash } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import formatDate from "@/app/utils/formateDate";
import { useGlobalContext } from "@/context/GlobalContext";

interface TasksProps {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isProgress: boolean;
  isImportant: boolean;
  repository: string;
  projectName: string;
  index: number;
  user: string;
  userId: string;
}

const TaskItem: React.FC<TasksProps> = ({
  id,
  title,
  description,
  date,
  isCompleted,
  isProgress,
  isImportant,
  repository,
  projectName,
  user,
  userId,
  index,
}) => {
  const { deleteTask } = useGlobalContext();

  return (
    <div
      className={`flex flex-col gap-2 py-6 rounded-lg justify-between group task-card bg-[#232329]`}
    >
      <div className="group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full  to-transparent pointer-events-none" />
      <div className={`text-lg font-bold mb-2 px-10 `}>
        <h1 className="group-hover:translate-x-2 transition duration-200 inline-block">
          {title}
        </h1>
        <p className="text-sm font-semibold text-white/80 pb-2">
          {projectName}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-[#AEBFBE] max-w-xs break-words px-10">
          {description}
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-accent px-10">{user}</p>
          <p className="text-xs text-[#c97979] px-10">{formatDate(date)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 px-10">
        {isCompleted && (
          <button className="p-[3px] relative" disabled>
            <div className="px-2 py-1 bg-green-500 rounded-[6px] text-sm relative group transition duration-200 text-white">
              Completed
            </div>
          </button>
        )}
        {!isProgress && !isCompleted && (
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-slate-500 rounded-lg" />
            <div className="px-4 py-1 bg-black rounded-[6px] text-sm relative group transition duration-200 text-white hover:bg-transparent">
              Await
            </div>
          </button>
        )}
        {isProgress && (
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-[#3D4FF5] rounded-lg" />
            <div className="px-1 py-1 bg-black rounded-[6px] text-sm relative group transition duration-200 text-white hover:bg-transparent">
              In Progress
            </div>
          </button>
        )}
        <div className="flex gap-2 hover:text-white ">
          <button>
            <CiEdit />
          </button>
          <button
            className="text-red-500"
            onClick={() => {
              deleteTask(id);
            }}
          >
            <CiTrash />
          </button>
          <a
            href={repository}
            target="_blank"
            className="repository text-[#AEBFBE]"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
