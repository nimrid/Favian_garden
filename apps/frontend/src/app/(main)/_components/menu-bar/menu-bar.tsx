"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib";
import { User } from "@/types/user";
import { menuItems } from "./menu-bar-constants";
import UserItem from "./user-item";

const dummyUser: User = {
  id: 1,
  name: "Soumitra Saha",
  email: "soumitrosahaofficial@gmail.com",
};

export const MenuBarComponent = () => {
  const pathname = usePathname();

  return (
    <>
      <aside className="group/sidebar h-full dark:bg-background overflow-y-auto relative flex w-full flex-col  overflow-x-hidden">
        <div className="p-5">
          <UserItem user={dummyUser} />
        </div>

        <Separator />

        {/* Menu Items Group */}
        <div className="mt-8">
          {menuItems?.map((menuItem, idx) => (
            <div
              key={`${menuItem}__${idx}`}
              className="flex flex-col w-full mb-8 space-y-3"
            >
              {/* Menu Item */}
              {menuItem.items?.map((item, idx) => (
                <div key={`${item.name}__${idx}`} className="w-full px-6">
                  <Link
                    href={item.route}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                      }),
                      "w-full",
                      item.route === pathname && "bg-muted-1"
                    )}
                  >
                    <div className="w-full flex items-center space-x-4">
                      <div>
                        {item.icon && <span>{item.icon("w-6 h-6")}</span>}
                      </div>
                      <div className="col-span-4">{item.name}</div>
                    </div>
                  </Link>
                </div>
              ))}

              {/* Separator */}
              {idx !== menuItems?.length - 1 && (
                <div className="pt-5">
                  <Separator />
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default React.memo(MenuBarComponent);
