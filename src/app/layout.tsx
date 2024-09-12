import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "---font-jetbrainsMono",
});

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
      <body
        className={`h-screen ${jetbrainsMono.variable} bg-primary text-white`}
      >
        <script
          type="module"
          defer
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/helix.js"
        ></script>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
