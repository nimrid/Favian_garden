import * as React from 'react';
import MainLayout from './_layout/main-layout';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default MainAppLayout;
