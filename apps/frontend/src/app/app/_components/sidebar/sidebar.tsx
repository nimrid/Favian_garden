'use client';

import * as React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib';
import SidebarCard from './sidebar-card';
import { usePathname } from 'next/navigation';
import { Routes } from '@/types';
import TopSellersCard from './top-sellers-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { topSellers } from '@/constant';

type GenerateHistory = {
  title: string;
  description: string;
  date?: string;
};

const generateHistories: GenerateHistory[] = [
  {
    title: 'Generate an Image of A ha...',
    description:
      "A ha! This is an example of a haiku generated using our AI. It's a simple yet powerful way to express emotions and thoughts.",
    date: 'July 12, 2023',
  },
  {
    title: 'Generate an Image of A ha...',
    description:
      "A ha! This is an example of a haiku generated using our AI. It's a simple yet powerful way to express emotions and thoughts.",
    date: 'July 12, 2023',
  },
  {
    title: 'Generate an Image of A ha...',
    description:
      "A ha! This is an example of a haiku generated using our AI. It's a simple yet powerful way to express emotions and thoughts.",
    date: 'July 12, 2023',
  },
];

export const SideBarComponent = () => {
  const pathname = usePathname();

  return (
    <ScrollArea className="w-full h-screen">
      <aside className="group/right-sidebar h-full dark:bg-background overflow-y-auto relative flex w-full flex-col  overflow-x-hidden px-3">
        {pathname === Routes.Market ? (
          <>
            {/* Sales */}
            <div className="flex flex-col space-y-3 mt-8">
              <h3 className="text-xl">Sales</h3>

              <div className="flex items-center justify-between p-4 bg-muted-2 rounded-xl">
                <h5>Art sold today</h5>
                <h5>120</h5>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted-2 rounded-xl">
                <h5>Total earnings today</h5>
                <h5>$950000</h5>
              </div>
            </div>

            {/* Top Sellers */}
            <div className="w-full my-8">
              <div className="flex items-center justify-between w-full">
                <h3>Top Sellers</h3>
                <Button
                  variant={'link'}
                  size={'sm'}
                  className="text-destructive"
                >
                  See more
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                {topSellers?.map((u, idx) => {
                  return (
                    <TopSellersCard
                      key={idx}
                      avatar={u?.avatar}
                      label={u?.name}
                      handle={u?.handle}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mt-6">
              <h3 className="text-2xl font-[600]">Recent</h3>

              <AlertDialog>
                <AlertDialogTrigger>
                  <div
                    className={cn(
                      buttonVariants({
                        variant: 'link',
                        className: 'cursor-pointer text-destructive',
                      })
                    )}
                  >
                    Delete All
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-accent-1/50">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your recent history and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-background-1">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-accent-1 hover:bg-accent-1/80">
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Sidebar Card */}
            <div className="mt-6 flex flex-col space-y-3">
              {generateHistories?.map((g, idx) => (
                <SidebarCard
                  key={`${g.title}__${idx}__${Date.now()}`}
                  title={g.title}
                  description={g.description}
                />
              ))}
            </div>
          </>
        )}
      </aside>
    </ScrollArea>
  );
};

export default React.memo(SideBarComponent);
