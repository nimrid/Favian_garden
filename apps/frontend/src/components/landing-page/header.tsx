import { Button } from "@/components/ui/button";
import { NavItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import WalletConnector from "@/context/WalletConnector";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface HeaderProps {
  navItems: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({ navItems = [], ...props }) => {
  return (
    <nav
      {...props}
      className="hidden md:flex container xl:mx-auto max-w-7xl items-center justify-between px-5 xl:px-0"
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
       <WalletMultiButton />
      </div>
    </nav>
  );
};

export default Header;
