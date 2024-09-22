/**
 * AUTHOR: SOUMITRA SAHA
 * GITHUB: https://github.com/SOUMITRO-SAHA
 * TWITTER: @SoumitraSaha100
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib";
import { TooltipProvider } from "@/components/ui/tooltip";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Favian Garden",
  description:
    "A platform where AI Artists and creators generate stunning AI ART, mint them as NFTs on the Solana network using METAPLEX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDevMode = process.env.NODE_ENV !== "production";

  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          `antialiased`,
          isDevMode && "debug-screens"
        )}
      >
      
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        
      </body>
    </html>
  );
}



