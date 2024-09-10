// components/Logo.tsx
import React from "react";
import { motion } from "framer-motion";
import { IconUser } from "@tabler/icons-react";

export const Logo = ({ fullName }: { fullName: string | null }) => {
  return (
    <p className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <IconUser className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {fullName || "Menu"}
      </motion.span>
    </p>
  );
};
