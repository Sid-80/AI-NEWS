import Navbar from '@/components/shared/dashboard/Navbar';
import React from 'react'

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className={`h-screen w-screen overflow-hidden`}>
            <Navbar />
            {children}
        </body>
      </html>
    );
  }