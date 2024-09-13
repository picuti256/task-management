"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

// Toaster
import toast from "react-hot-toast";

// Modal
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/modal";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

// Components for the form
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input, Textarea } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import usersData from "../../data/users.json";
import { useGlobalContext } from "@/context/GlobalContext";

type Project = {
  id: number;
  name: string;
  svn_url: string;
};

type User = {
  userId: string;
  user: string;
};

const FormModal = () => {
  const { allTasks } = useGlobalContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [important, setImportant] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [repository, setRepository] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const API_GITHUB = process.env.NEXT_PUBLIC_API_GITHUB;

  const handleChange = (name: string) => (e: any) => {
    if (name === "projectName") {
      const selectedProject = projects.find(
        (project) => project.name === e.target.value
      );

      setProjectName(e.target.value);

      if (selectedProject) {
        setRepository(selectedProject.svn_url);
      }
    } else if (name === "user") {
      const selectedUser = usersData.find(
        (user) => user.user === e.target.value
      );
      setSelectedUser(e.target.value);

      if (selectedUser) {
        setSelectedUserId(selectedUser.userId);
      }
    } else {
      switch (name) {
        case "title":
          setTitle(e.target.value);
          break;
        case "description":
          setDescription(e.target.value);
          break;
        case "date":
          setDate(e.target.value);
          break;
        case "completed":
          setCompleted(e.target.checked);
          break;
        case "important":
          setImportant(e.target.checked);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!API_GITHUB) {
          throw "Missing API";
        }
        const response = await axios.get(API_GITHUB);
        setProjects(response.data);
      } catch (error) {
        console.error("Error to get projects", error);
      }
    };
    fetchProjects();
  }, [API_GITHUB]);

  const handleSubmit = async (e: any, onClose: () => void) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      important,
      completed,
      repository,
      projectName,
      userId: selectedUserId,
      user: selectedUser,
      controlLevel: localStorage.getItem("controlLevel"),
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        console.log(res.data.error);
        toast.error(res.data.error);
      } else {
        toast.success("Task created successfully.");
        onClose();
        await allTasks();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-accent font-bold">
        Create a new task
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        size="lg"
      >
        <ModalContent className="bg-primary pt-2 text-white flex flex-col gap-2 items-center">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                Fill in all the informations for the task
              </ModalHeader>
              <form
                id="task-form"
                className="text-black w-96 flex flex-col gap-2 py-5"
                onSubmit={(e) => handleSubmit(e, onClose)}
              >
                <div className="relativefont-semibold ">
                  <label
                    htmlFor="title"
                    className="mb-2 display inline-block text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title of the task"
                    id="title"
                    value={title}
                    name="title"
                    onChange={handleChange("title")}
                    className="w-full p-2 bg-slate-100 rounded-lg"
                  />
                </div>
                <div className="relative mt-2 font-semibold ">
                  <label
                    htmlFor="title"
                    className="mb-2 display inline-block text-white"
                  >
                    Description
                  </label>
                  <textarea
                    rows={4}
                    id="description"
                    value={description}
                    name="description"
                    onChange={handleChange("description")}
                    placeholder="Brief description of the task"
                    className="w-full p-2 bg-slate-100 rounded-lg"
                  />
                </div>
                <div className="relative mt-4 font-semibold ">
                  <label
                    htmlFor="date"
                    className="mb-2 display inline-block text-white"
                  >
                    Date limit
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    name="date"
                    onChange={handleChange("date")}
                    className="w-full p-2 bg-slate-100 rounded-lg"
                  />
                </div>
                <div className="relative mt-2 font-semibold ">
                  <label
                    htmlFor="important"
                    className="mb-2 display inline-block text-white"
                  >
                    Important
                  </label>
                  <Checkbox
                    color="success"
                    name="important"
                    checked={important}
                    onChange={handleChange("important")}
                    id="important"
                    className="w-full p-4"
                  />
                </div>
                <input
                  type="text"
                  hidden
                  id="repository"
                  value={repository}
                  name="repository"
                  readOnly
                />
                <div className="relative mt-2 font-semibold ">
                  <label
                    htmlFor="projectName"
                    className="mb-2 display inline-block text-white"
                  >
                    Project
                  </label>
                  <select
                    id="projectName"
                    value={projectName}
                    name="projectName"
                    onChange={handleChange("projectName")}
                    className="w-full p-2 bg-slate-100 rounded-lg "
                  >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative mt-2 font-semibold ">
                  <label
                    htmlFor="user"
                    className="mb-2 display inline-block text-white"
                  >
                    User
                  </label>
                  <select
                    id="user"
                    value={selectedUser}
                    name="user"
                    onChange={handleChange("user")}
                    className="w-full p-2 bg-slate-100 rounded-lg "
                  >
                    <option value="">Select a user</option>
                    {usersData.map((user) => (
                      <option key={user.userId} value={user.user}>
                        {user.user}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="hidden"
                  id="userId"
                  value={selectedUserId}
                  name="userId"
                  readOnly
                />
                <Button
                  type="submit"
                  color="success"
                  className="font-bold mt-4"
                >
                  Create
                </Button>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModal;
