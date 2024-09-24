import { Button } from "@/components/ui/button";
import { NavItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react';

interface HeaderProps {
  navItems: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({ navItems = [], ...props }) => {
  const { publicKey } = useWallet(); // Get wallet address from Solana Wallet Adapter

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

        {/* Wallet Connect */}
        <WalletMultiButton /> {/* Button to connect wallet */}
        {/* {publicKey && (
          <p className="text-sm font-medium">
            Wallet Address: {publicKey.toString()}
          </p>
        )} */}
      </div>
    </nav>
  );
};

export default Header;
