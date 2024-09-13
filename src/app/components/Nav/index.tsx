"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiSignOutFill } from "react-icons/pi";

interface links {
  name: string;
  path: string;
  onClick?: () => void;
  icon?: any;
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
        return link.name === "logout" ? (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent-hover items-center flex gap-3 transition-all pl-16`}
            onClick={link.onClick}
          >
            {link.name}
            <PiSignOutFill />
          </Link>
        ) : (
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
