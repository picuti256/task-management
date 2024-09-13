"use client";

import { Pie, PieChart } from "recharts";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";
import { useEffect, useState } from "react";

interface ChartData {
  label: string;
  value: number;
  fill: string;
}

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  tasks: {
    label: "All Tasks",
  },
  openTasks: {
    label: "Open Tasks",
    color: "#7c756f",
  },
  tasksInProgress: {
    label: "Tasks in Progress",
    color: "#2563eb",
  },
  completedTasks: {
    label: "Completed Tasks",
    color: "#3ceb25",
  },
} satisfies ChartConfig;

export default function PieTasks() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/api/dashboard");
        const stats = response.data;

        setData([
          {
            label: "Open Task",
            value: stats.openTasks,
            fill: chartConfig.openTasks.color,
          },
          {
            label: "In Progress",
            value: stats.tasksInProgress,
            fill: chartConfig.tasksInProgress.color,
          },
          {
            label: "Completed",
            value: stats.completedTasks,
            fill: chartConfig.completedTasks.color,
          },
        ]);
      } catch (error) {
        console.error("Error fetching task statistics:", error);
      }
    }

    getData();
  }, []);

  return (
    <Card className="flex flex-col justify-between border-accent-hover">
      <CardHeader className="items-center pb-0">
        <CardTitle>All tasks </CardTitle>
        <CardDescription>Open, in progress and completed</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart className="text-black">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={data} dataKey="value" nameKey="label" stroke="0" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing the total os tasks since the creation.
        </div>
      </CardFooter>
    </Card>
  );
}
