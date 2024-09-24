"use client";
import * as React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { screens } from "@/constant";
import { useScreenSize } from "@/hooks";
import { cn } from "@/lib";
import { MenuBarComponent, MobileMenuBar } from "./_components/menu-bar";
import { SideBarComponent } from "./_components/sidebar/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, ...props }) => {
  const { width } = useScreenSize();

  return (
    <main>
      {/* Desktop | Tablet */}
      <div {...props} className={cn("w-screen h-screen hidden md:block")}>
        <ResizablePanelGroup direction="horizontal">
          {/* Side Bar Menu */}
          <ResizablePanel
            defaultSize={width <= screens.xl ? 20 : 14}
            minSize={width <= screens.xl ? 20 : 14}
            maxSize={width <= screens.xl ? 20 : 14}
          >
            <MenuBarComponent />
          </ResizablePanel>

          {/* First Handle */}
          <ResizableHandle />

          {/* Body */}
          <ResizablePanel defaultSize={63}>{children}</ResizablePanel>

          {/* Second Handle */}
          <ResizableHandle />

          {/* Right Side Bar */}
          <ResizablePanel
            defaultSize={width <= screens.xl ? 0 : 20}
            minSize={width < screens.xl ? 0 : 20}
            maxSize={width < screens.xl ? 0 : 20}
          >
            <SideBarComponent />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile | Extra Large Mobile Screens | Extra Small Mobile Screens */}
      <div {...props} className={cn("w-screen h-screen md:hidden")}>
        <ResizablePanelGroup direction="vertical">
          {/* Body */}
          <ResizablePanel defaultSize={95} maxSize={95} minSize={95}>
            {children}
          </ResizablePanel>

          {/* First Handle */}
          <ResizableHandle />

          {/* Side Bar Menu */}
          <ResizablePanel defaultSize={10} minSize={10} maxSize={10}>
            <MobileMenuBar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
};

export default MainLayout;
