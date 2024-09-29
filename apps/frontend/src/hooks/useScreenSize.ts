'use client';
import * as React from 'react';

export const useScreenSize = () => {
  // Initialize with 0 or undefined to avoid SSR issues
  const [screenSize, setScreenSize] = React.useState({
    width: 0,
    height: 0,
  });

  // Side Effects
  React.useEffect(() => {
    // Check if window is defined
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Initial setting of screen size
      handleResize();

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return screenSize;
};

export default useScreenSize;
