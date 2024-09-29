/**
 * AUTHOR: SOUMITRA SAHA
 * GITHUB: https://github.com/SOUMITRO-SAHA
 * TWITTER: @SoumitraSaha100
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import localFont from "next/font/local";

import { ClientProvider } from '@/components/provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib';
import AppWalletProvider from '../components/AppWalletProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Favian Garden',
  description:
    'A platform where AI Artists and creators generate stunning AI ART, mint them as NFTs on the Solana network using METAPLEX',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDevMode = process.env.NODE_ENV !== 'production';

  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          `antialiased`,
          isDevMode && 'debug-screens'
        )}
      >
        <AppWalletProvider>
          <ClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster />
            </ThemeProvider>
          </ClientProvider>
        </AppWalletProvider>
      </body>
    </html>
  );
}
