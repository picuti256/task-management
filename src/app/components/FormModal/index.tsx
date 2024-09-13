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
  const [selectUser, setSelectUser] = useState("");
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
        case "user":
          setUsers(e.targe.value);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      important,
      completed,
      repository,
      projectName,
      userId: localStorage.getItem("userId"),
      controlLevel: localStorage.getItem("controlLevel"),
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
    };

    try {
      const res = await axios.post("/api/tasks", task);

      if (res.data.error) {
        toast.error(res.data.error);
      }

      toast.success("Task created successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create a new task
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        size="xl"
      >
        <ModalContent className="bg-neutral-400 px-4 flex flex-col gap-2 items-center">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Fill in all the informations for the task
              </ModalHeader>
              <form
                id="task-form"
                className="text-black w-96 flex flex-col gap-2"
                onSubmit={handleSubmit}
              >
                <div className="input-control">
                  <Input
                    type="text"
                    isRequired
                    label="Title of the task"
                    id="title"
                    value={title}
                    name="title"
                    onChange={handleChange("title")}
                  />
                </div>
                <div className="input-control">
                  <Textarea
                    id="description"
                    label="Description"
                    value={description}
                    name="description"
                    onChange={handleChange("description")}
                    placeholder="Brief description of the task"
                    minRows={2}
                    isRequired
                  />
                </div>
                <div className="input-control">
                  <input
                    type="date"
                    id="date"
                    value={date}
                    name="date"
                    onChange={handleChange("date")}
                  />
                </div>
                <div className="input-control">
                  <Checkbox
                    color="danger"
                    name="important"
                    checked={important}
                    onChange={handleChange("important")}
                    id="important"
                  >
                    Important
                  </Checkbox>
                </div>
                <div className="input-control">
                  <input
                    type="text"
                    hidden
                    id="repository"
                    value={repository}
                    name="repository"
                    readOnly
                  />
                </div>
                <div className="input-control">
                  <label htmlFor="projectName">Project</label>
                  <select
                    id="projectName"
                    value={projectName}
                    name="projectName"
                    onChange={handleChange("projectName")}
                  >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-control">
                  <label htmlFor="user">User</label>
                  <select
                    id="user"
                    value={selectedUser}
                    name="user"
                    onChange={handleChange("user")}
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
                <Button type="submit" color="success" onPress={onClose}>
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
