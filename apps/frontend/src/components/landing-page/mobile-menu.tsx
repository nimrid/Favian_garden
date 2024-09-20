"use client";

import React from "react";

import { NavItem } from "@/types";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useAppStore } from "@/store";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  navItems: NavItem[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  navItems = [],
  ...props
}) => {
  const { showMobileMenu, setShowMobileMenu } = useAppStore();
  return (
    <section className="md:hidden">
      {!showMobileMenu && (
        <div {...props}>
          {/* Mobile Menu Button  */}
          <div className="flex justify-end w-full h-fit p-5">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
              }}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <nav className="w-screen h-screen flex justify-center bg-background-1">
          <div className="absolute top-5 right-5">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
              }}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="my-16 flex flex-col items-center">
            {/* Brand Logo */}
            <Image src={"/logo.svg"} alt="logo" width={100} height={100} />

            {navItems?.map((item) => (
              <Button
                key={item.label}
                variant={"link"}
                size={"lg"}
                className="text-lg my-2"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </nav>
      )}
    </section>
  );
};

export default MobileMenu;
