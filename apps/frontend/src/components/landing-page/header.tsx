import { Button } from "@/components/ui/button";
import { NavItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect} from "react";
// import WalletConnector from "@/context/WalletConnector";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

interface HeaderProps {
  navItems: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({ navItems = [], ...props }) => {
  const { publicKey } = useWallet();

  useEffect(() => {
    const sendWalletAddress = async () => {
      if (publicKey) {
        const walletAddress = publicKey.toString();
        console.log("Connected Wallet Address:", walletAddress);
  
        try {
          const response = await fetch('http://localhost:5000/api/v1/wallet/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ walletAddress }),
            credentials: "include", // Important for session cookies
          });
  
          const result = await response.json();
          console.log(result);
          if (!response.ok) {
            throw new Error('Failed to send wallet address');
          }
  
          console.log('Wallet address sent to the backend successfully.');
        } catch (error) {
          console.error('Error sending wallet address:', error);
        }
      }
    };
  
    sendWalletAddress();
  }, [publicKey]);  // Run the effect only when publicKey changes (when the wallet connects)
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

        <WalletMultiButton
          style={{
            height: "2.5rem",
            width: "100%",
          }}
        />
      </div>
    </nav>
  );
};

export default Header;
