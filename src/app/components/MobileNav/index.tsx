"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import { PiSignOutFill } from "react-icons/pi";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

interface links {
  name: string;
  path: string;
  onClick?: () => void;
  icon?: any;
}

const allLinks: links[] = [
  {
    name: "All tasks",
    path: "/",
  },
  {
    name: "Urgent",
    path: "/urgent",
  },
  {
    name: "In Progress",
    path: "/progress",
  },
  {
    name: "Completed",
    path: "/done",
  },
  {
    name: "Dashbord",
    path: "/dashboard",
  },
  {
    name: "logout",
    path: "/login",
    onClick: () => localStorage.clear(),
  },
];

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pathname = usePathname();
  const [controlLevel, setControlLevel] = useState<string | null>(null);

  useEffect(() => {
    const level = localStorage.getItem("controlLevel");
    setControlLevel(level);
  }, []);

  const filteredLinks = allLinks.filter((link) => {
    if (link.name === "Analytics" && controlLevel !== "3") {
      return false;
    }
    return true;
  });

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-xl text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Giovanne <span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
        <nav className=" flex flex-col justify-center items-center gap-8">
          {filteredLinks.map((link, index) => {
            return (
              <SheetClose asChild key={index}>
                <Link
                  href={link.path}
                  key={index}
                  className={`${
                    link.path === pathname &&
                    "text-accent border-b-2 border-accent"
                  } text-xl capitalize hover:text-accent-hover transition-all`}
                >
                  {link.name}
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
