import { Button } from "@/components/ui/button";
import { NavItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  navItems: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({ navItems = [], ...props }) => {
  return (
    <nav
      {...props}
      className="container mx-auto max-w-7xl flex items-center justify-between"
    >
      {/* Brand Logo */}
      <Image src={"/logo.svg"} alt="logo" width={100} height={100} />

      <div className="flex items-center space-x-5">
        {/* Nav Items */}
        <div className="flex items-center space-x-3">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant={"link"}>
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            </Button>
          ))}
        </div>

        {/* Buttons */}
        <Button variant={"primary"}>Add Wallet</Button>
      </div>
    </nav>
  );
};

export default Header;
