import * as React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib";
import { MenuBarComponent } from "./_components/menu-bar";
import { SideBarComponent } from "./_components/sidebar/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, ...props }) => {
  // TODO: This will be a protected route | authenticate user before using this route
  // (@SOUMITRO-SAHA)

  const isDevMode = process.env.NODE_ENV !== "production";

  return (
    <div
      {...props}
      className={cn("w-screen h-screen", isDevMode && "debug-screens")}
    >
      <ResizablePanelGroup direction="horizontal">
        {/* Side Bar Menu */}
        <ResizablePanel defaultSize={17} minSize={17} maxSize={20}>
          <MenuBarComponent />
        </ResizablePanel>

        {/* First Handle */}
        <ResizableHandle />

        {/* Body */}
        <ResizablePanel defaultSize={63}>{children}</ResizablePanel>

        {/* Second Handle */}
        <ResizableHandle />

        {/* Right Side Bar */}
        <ResizablePanel defaultSize={20} minSize={20} maxSize={20}>
          <SideBarComponent />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;