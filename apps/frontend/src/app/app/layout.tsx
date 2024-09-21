import * as React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib";
import { MenuBarComponent, MobileMenuBar } from "./_components/menu-bar";
import { SideBarComponent } from "./_components/sidebar/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, ...props }) => {
  // TODO: This will be a protected route | authenticate user before using this route
  // (@SOUMITRO-SAHA)

  return (
    <main>
      {/* Desktop | Tablet */}
      <div {...props} className={cn("w-screen h-screen hidden md:block")}>
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
