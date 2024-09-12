// components/SidebarMenu.tsx
import React from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/components/ui/sidebar";
import { PiSignOutFill } from "react-icons/pi";
import { Logo } from "../Logo";
import { LogoIcon } from "../LogoIcon";

const links = [
  {
    label: "Projects",
    href: "/",
    icon: (
      <IconBrandTabler className="text-slate-100 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "In Progress",
    href: "/progress",
    icon: (
      <IconUserBolt className="text-slate-100 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Done",
    href: "/done",
    icon: (
      <IconSettings className="text-slate-100 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Urgent",
    href: "/urgent",
    icon: (
      <IconArrowLeft className="text-slate-100 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export const SidebarMenu = ({
  open,
  setOpen,
  fullName,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fullName: string | null;
}) => {
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-black/80 text-slate-100">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo fullName={fullName} /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Logout",
              href: "/login",
              icon: <PiSignOutFill />,
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};
