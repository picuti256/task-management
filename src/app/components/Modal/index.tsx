"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  svn_url: string;
};

const Modal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [important, setImportant] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [repository, setRepository] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const API_GITHUB = process.env.NEXT_PUBLIC_API_GITHUB;

  const handleChange = (name: string) => (e: any) => {
    if (name === "projectName") {
      setProjectName(e.targe.value);

      const selectedProject = projects.find(
        (project) => project.name === e.target.value
      );

      if (selectedProject) {
        setRepository(selectedProject.svn_url);
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

  return (
    <div>
      <h4>Create a Task</h4>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
          placeholder="Title of the task"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          name="description"
          onChange={handleChange("description")}
          placeholder="Brief description of the task"
          rows={4}
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Time need to complete the task</label>
        <input
          type="text"
          id="date"
          value={date}
          name="date"
          onChange={handleChange("date")}
          placeholder="1h, 3h, 1d, 1w..."
        />
      </div>
      <div className="input-control">
        <label htmlFor="important">Important</label>
        <input
          type="checkbox"
          id="important"
          value={important.toString()}
          name="important"
          onChange={handleChange("important")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="completed">Completed the task</label>
        <input
          type="checkbox"
          id="completed"
          value={completed.toString()}
          name="completed"
          onChange={handleChange("completed")}
          placeholder="Title of the task"
        />
      </div>
      <div className="input-control">
        <input
          type="text"
          hidden
          id="repository"
          value={repository}
          name="repository"
          readOnly
          placeholder="Repository URL"
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

      <div className="submit-btn">
        <button type="submit">Create task</button>
      </div>
    </div>
  );
};

export default Modal;
