import * as React from "react";

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
} from "@/components/ui/alert-dialog";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";
import SidebarCard from "./sidebar-card";

type GenerateHistory = {
  title: string;
  description: string;
  date?: string;
};

const generateHistories: GenerateHistory[] = [
  {
    title: "Generate an Image of A ha...",
    description:
      "A ha! This is an example of a haiku generated using our AI. It's a simple yet powerful way to express emotions and thoughts.",
    date: "July 12, 2023",
  },
  {
    title: "Generate an Image of A ha...",
    description:
      "A ha! This is an example of a haiku generated using our AI. It's a simple yet powerful way to express emotions and thoughts.",
    date: "July 12, 2023",
  },
  {
    title: "Generate an Image of A ha...",
    description:
      "A ha! This is an example of a haiku generated using our AI. It's a simple yet powerful way to express emotions and thoughts.",
    date: "July 12, 2023",
  },
];

export const SideBarComponent = () => {
  return (
    <aside className="group/right-sidebar h-full dark:bg-background overflow-y-auto relative flex w-full flex-col z-[99999]  overflow-x-hidden px-3">
      <div className="flex items-center justify-between mt-6">
        <h3 className="text-2xl font-[600]">Recent</h3>

        <AlertDialog>
          <AlertDialogTrigger>
            <div
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: "cursor-pointer",
                })
              )}
            >
              Delete All
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                recent history and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
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
    </aside>
  );
};

export default React.memo(SideBarComponent);
