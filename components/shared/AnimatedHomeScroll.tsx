"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

export function AnimatedHomeScroll() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <h1 className="text-4xl font-semibold text-black dark:text-white">
            SMART NEWS FOR <br />
            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              SMART READERS
            </span>
          </h1>
        </>
      }
    >
      <Image
        src={`/newDash2.png`}
        alt="hero"
        height={720}
        width={1400}
        className="mx-auto rounded-2xl object-cover h-full object-left-top"
        draggable={false}
      />
    </ContainerScroll>
  );
}
