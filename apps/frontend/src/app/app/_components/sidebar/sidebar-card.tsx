import { cn } from "@/lib";
import React from "react";

interface SidebarCardProps {
  title: string;
  description: string;
}

export const SidebarCard: React.FC<SidebarCardProps> = ({
  title,
  description,
  ...props
}) => {
  return (
    <div className={cn("border border-border-1 rounded-xl p-3")} {...props}>
      <h6 className="w-full text-ellipsis overflow-hidden whitespace-nowrap text-xl text-white/60">
        {title}
      </h6>
      <p className="text-white/20 overflow-hidden text-ellipsis line-clamp-2">
        {description}
      </p>
    </div>
  );
};

export default SidebarCard;
