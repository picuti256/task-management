"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

interface links {
  name: string;
  path: string;
}

const links: links[] = [
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
];

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

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
          {links.map((link, index) => {
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
