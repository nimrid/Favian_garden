"use client";

import { Separator } from "@/components/ui/separator";
import { useApp } from "@/store";
import { User } from "@/types/user";
import * as React from "react";
import { menuItems } from "./menu-bar-constants";
import UserItem from "./user-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";

const dummyUser: User = {
  id: 1,
  name: "Soumitra Saha",
  email: "soumitrosahaofficial@gmail.com",
};

export const MenuBarComponent = () => {
  const appStore = useApp();
  console.log("App Store: ", appStore);

  return (
    <>
      <aside className="group/sidebar h-full dark:bg-background overflow-y-auto relative flex w-full flex-col z-[99999]  overflow-x-hidden">
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
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full",
                      item.uniqueId === appStore.selectedMenuItem?.uniqueId &&
                        "bg-muted-1"
                    )}
                    onClick={() => {
                      appStore.setSelectedMenuItem(item);
                    }}
                  >
                    <div className="w-full flex items-center space-x-4">
                      <div>
                        {item.icon && <span>{item.icon("w-6 h-6")}</span>}
                      </div>
                      <div className="col-span-4">{item.name}</div>
                    </div>
                  </Button>
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
