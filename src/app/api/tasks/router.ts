import { NextResponse } from "next/server";
import users from "../../data/users.json";
import { toast } from "react-toastify";
import prisma from "@/utils/connect";

const POST = async (req: Request) => {
  try {
    const userId = localStorage.getItem("userId");
    const controlLevel = localStorage.getItem("controlLevel");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    const fullName = firstName + " " + lastName;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (controlLevel === "1") {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const {
      title,
      description,
      date,
      important,
      completed,
      repository,
      projectName,
    } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isImportant: important,
        isCompleted: completed,
        repository,
        projectName,
        userId,
        user: fullName,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
};

const GET = async (req: Request) => {
  try {
  } catch (error) {
    console.log("ERROR GETING TASK: ", error);
    return NextResponse.json({ error: "Error geting task", status: 500 });
  }
};

const PUT = async (req: Request) => {
  try {
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
};

const DELETE = async (req: Request) => {
  try {
  } catch (error) {
    console.log("ERROR DELETING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
};
