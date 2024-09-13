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
      user,
      controlLevel,
    } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (controlLevel === "1") {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    if (!title || !description || !date || !projectName || !user) {
      console.log(title);
      console.log(description);
      console.log(date);
      console.log(projectName);
      console.log(user);

      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    if (title.length < 3) {
      return NextResponse.json(
        {
          error: "Title must be at least 3 characters long",
        },
        { status: 400 }
      );
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
        user,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const tasks = await prisma.task.findMany({});

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("ERROR GETING TASK: ", error);
    return NextResponse.json({ error: "Error geting task" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { isCompleted, isProgress, id } = await req.json();

    let data = {};

    if (isProgress === true) {
      data = {
        isCompleted: !isCompleted,
        isProgress: !isProgress,
        finishAt: new Date().toISOString(),
      };
    } else {
      data = { isProgress: !isProgress };
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data,
    });

    console.log("TASK UPDATED: ", task);
    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}
