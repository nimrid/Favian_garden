import * as React from 'react';
import { useScreenSize } from '@/hooks/useScreenSize';

const ScreenSizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const screenSize = useScreenSize();

  //   @ts-expect-error: This will work
  return <div>{children(screenSize)}</div>;
};

export default ScreenSizeProvider;
