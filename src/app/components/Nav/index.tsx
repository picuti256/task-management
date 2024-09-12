"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface links {
  name: string;
  path: string;
  onClick?: () => void;
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
    name: "logout",
    path: "/login",
    onClick: () => localStorage.clear(),
  },
];

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent-hover transition-all`}
            onClick={link.onClick}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
