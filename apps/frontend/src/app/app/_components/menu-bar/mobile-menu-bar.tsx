"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";
import { mobileMenuItems } from "./menu-bar-constants";

export const MobileMenuBar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-screen h-full flex items-center justify-evenly bg-background-1/50">
      {/* Menu Item */}
      {mobileMenuItems?.map((item, idx) => (
        <div key={`${item.name}__${idx}`}>
          <Link
            href={item.route}
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "w-full h-full",
              item.route === pathname && "bg-muted-1"
            )}
          >
            <div className="w-full text-center flex flex-col justify-center items-center">
              {item.icon && <div>{item.icon("w-6 h-6")}</div>}
              <div className="text-xs text-muted-foreground">{item.name}</div>
            </div>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default MobileMenuBar;
