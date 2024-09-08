import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { cn } from "@/lib";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UserItemProps {
  user?: User | undefined;
  className?: string;
}

const UserItem: React.FC<UserItemProps> = ({ user, className }) => {
  return (
    <div className={cn("w-full", className)}>
      {user ? (
        <div className="grid grid-cols-5 space-x-2 items-center">
          <Avatar>
            <AvatarImage
              src={cn(user?.avatarImage ?? "https://github.com/shadcn.png")}
            />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col w-full col-span-4">
            <h3 className="w-full text-xl font-[500]">
              {user?.name || "Unknown"}
            </h3>

            <div>
              <Tooltip>
                <TooltipTrigger>
                  <p className="text-xs overflow-hidden text-ellipsis">
                    {user?.email || "No Email Id Available"}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user?.email}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 min-w-[60%] col-span-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserItem;
