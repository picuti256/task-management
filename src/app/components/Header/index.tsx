"use client";
import Link from "next/link";
import Nav from "../Nav";
import { Button } from "@nextui-org/button";
import MobileNav from "../MobileNav";
import { useEffect, useState } from "react";

const Header = () => {
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    if (firstName && lastName) {
      setFullName(`${firstName} ${lastName}`);
    }
  }, []);

  return (
    <header className="py-4 xl:py-12 text-white bg-primary">
      <div className="container xl:mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-semibold ">
            {fullName} <span className="text-blue-400">.</span>
          </h1>
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
