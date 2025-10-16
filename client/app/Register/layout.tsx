import React, { ReactNode } from 'react';
import WelcomeNav from '@/components/Welcome/WelcomeNav';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <WelcomeNav />
      {children}
    </>
  );
}
