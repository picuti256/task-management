import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Contagem geral de tarefas
    const openTasks = await prisma.task.count({
      where: {
        isProgress: false,
        isCompleted: false,
      },
    });

    const tasksInProgress = await prisma.task.count({
      where: {
        isProgress: true,
        isCompleted: false,
      },
    });

    const completedTasks = await prisma.task.count({
      where: {
        isCompleted: true,
      },
    });

    // Contagem de tarefas por usuário
    const openTasksByUser = await prisma.task.groupBy({
      by: ["user"],
      _count: {
        _all: true,
      },
      where: {
        isProgress: false,
        isCompleted: false,
      },
    });

    const tasksInProgressByUser = await prisma.task.groupBy({
      by: ["user"],
      _count: {
        _all: true,
      },
      where: {
        isProgress: true,
        isCompleted: false,
      },
    });

    const completedTasksByUser = await prisma.task.groupBy({
      by: ["user"],
      _count: {
        _all: true,
      },
      where: {
        isCompleted: true,
      },
    });

    return NextResponse.json({
      openTasks,
      tasksInProgress,
      completedTasks,
      openTasksByUser,
      tasksInProgressByUser,
      completedTasksByUser,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Error getting task data" },
      { status: 500 }
    );
  }
}
