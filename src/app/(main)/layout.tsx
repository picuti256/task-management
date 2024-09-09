import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Task Management",
  description:
    "An application for controlling tasks in projects. With this app, you can take projects from GitHub and thus create a control for tasks within each project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">{children}</body>
    </html>
  );
}
