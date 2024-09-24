"use client";

import * as React from "react";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = React.useState({
    width: window?.innerWidth,
    height: window?.innerHeight,
  });

  // Side Effects
  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    };

    window?.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};
