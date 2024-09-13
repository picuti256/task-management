import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Task } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

interface GlobalContextProps {
  tasks: Task[] | null;
  isLoading: boolean;
  allTasks: () => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  completedTasks: Task[] | undefined;
  importantTasks: Task[] | undefined;
  incompletedTasks: Task[] | undefined;
  progressTask: (task: any) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const checkUserAuthentication = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    }
  };

  const allTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error retrieving the tasks: ", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTask = async (id: any) => {
    const controlLevel = localStorage.getItem("controlLevel");

    if (controlLevel === "1") {
      toast.error("User unauthorized for this.");
      return;
    }
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");

      await allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const progressTask = async (task: any) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      const { isCompleted, isProgress } = res.data;

      if (isCompleted) {
        toast.success("Task completed.");
      }
      if (isProgress) {
        toast.success("Task started.");
      }
      await allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wront.");
    }
  };

  const completedTasks =
    tasks?.filter((task) => task.isCompleted === true) || [];

  const importantTasks = tasks?.filter(
    (task) => task.isImportant === true || []
  );

  const incompletedTasks =
    tasks?.filter((task) => task.isCompleted === false) || [];

  useEffect(() => {
    allTasks();
  }, []);

  useEffect(() => {
    checkUserAuthentication();
  }, [path]);

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        isLoading,
        allTasks,
        deleteTask,
        completedTasks,
        importantTasks,
        incompletedTasks,
        progressTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
