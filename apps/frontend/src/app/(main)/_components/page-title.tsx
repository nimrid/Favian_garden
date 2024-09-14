import { cn } from "@/lib";
import React from "react";

interface PageTitleProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  label: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  as: Tag = "h3",
  label,
  ...props
}) => {
  const titleStyle = Tag === "h1" ? "text-2xl" : "text-xl";
  return (
    <Tag className={cn(titleStyle)} {...props}>
      {label}
    </Tag>
  );
};
