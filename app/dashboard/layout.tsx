import Categories from "@/components/shared/dashboard/Categories";
import Navbar from "@/components/shared/dashboard/Navbar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-start overflow-hidden w-screen h-screen">
      <Navbar />
      {children}
    </div>
  );
}
