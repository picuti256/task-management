"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

export const description = "A multiple bar chart showing task status by user";

const chartConfig = {
  await: {
    label: "Await",
    color: "#8d8178",
  },
  inProgress: {
    label: "In Progress",
    color: "#2563eb",
  },
  completed: {
    label: "Completed",
    color: "#3ceb25",
  },
};

export default function TooltipTasks() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchTaskData() {
      try {
        const response = await axios.get("/api/dashboard");
        const data = response.data;

        const users = new Set([
          ...data.openTasksByUser.map((item) => item.user),
          ...data.tasksInProgressByUser.map((item) => item.user),
          ...data.completedTasksByUser.map((item) => item.user),
        ]);

        const formattedData = Array.from(users).map((user) => {
          const awaitTasks =
            data.openTasksByUser.find((item) => item.user === user)?._count
              ._all || 0;
          const inProgressTasks =
            data.tasksInProgressByUser.find((item) => item.user === user)
              ?._count._all || 0;
          const completedTasks =
            data.completedTasksByUser.find((item) => item.user === user)?._count
              ._all || 0;

          return {
            user,
            await: awaitTasks,
            inProgress: inProgressTasks,
            completed: completedTasks,
          };
        });

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    }

    fetchTaskData();
  }, []);

  return (
    <Card className="border-accent-hover">
      <CardHeader>
        <CardTitle>Task Status by User</CardTitle>
        <CardDescription>Current task distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="text-black">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="user"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-accent"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="await" fill={chartConfig.await.color} radius={4} />
            <Bar
              dataKey="inProgress"
              fill={chartConfig.inProgress.color}
              radius={4}
            />
            <Bar
              dataKey="completed"
              fill={chartConfig.completed.color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Here we can get an idea how our users are working.
        </div>
        <div className="leading-none text-muted-foreground">
          Showing task status distribution for all users
        </div>
      </CardFooter>
    </Card>
  );
}
