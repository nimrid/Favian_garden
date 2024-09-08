import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { MenuBarComponent } from "./_components/menu-bar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, ...props }) => {
  // TODO: This will be a protected route | authenticate user before using this route
  // (@SOUMITRO-SAHA)

  return (
    <div {...props} className="w-screen h-screen">
      <ResizablePanelGroup direction="horizontal">
        {/* Side Bar Menu */}
        <ResizablePanel defaultSize={17} minSize={17} maxSize={20}>
          <MenuBarComponent />
        </ResizablePanel>

        {/* First Handle */}
        <ResizableHandle />

        {/* Body */}
        <ResizablePanel>
          <div>{children}</div>
        </ResizablePanel>

        {/* Second Handle */}
        <ResizableHandle />

        {/* Right Side Bar */}
        <ResizablePanel defaultSize={17} minSize={17} maxSize={20}>
          This is 3rd Side Bar
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
