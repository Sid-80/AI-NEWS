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
      <div className="flex items-start justify-center w-full p-4">
        <Categories />
      </div>
      {children}
    </div>
  );
}
