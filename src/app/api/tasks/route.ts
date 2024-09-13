import { NextResponse } from "next/server";
import users from "../../data/users.json";
import { toast } from "react-toastify";
import prisma from "@/utils/connect";

export async function POST(req: Request) {
  try {
    const {
      userId,
      title,
      description,
      date,
      important,
      completed,
      repository,
      projectName,
      firstName,
      lastName,
      controlLevel,
    } = await req.json();

    const fullName = firstName + " " + lastName;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (controlLevel === "1") {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

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
}

export async function GET(req: Request) {
  try {
    const tasks = await prisma.task.findMany({});

    return NextResponse.json(tasks)
  } catch (error) {
    console.log("ERROR GETING TASK: ", error);
    return NextResponse.json({ error: "Error geting task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const {isCompleted, id, controlLevel, userId} = await req.json();


  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}

