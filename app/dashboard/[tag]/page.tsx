"use client";
import DashboardLoader from "@/components/shared/dashboard/Loader";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGetNewsByTag } from "@/lib/react-query/mutations";
import React, { useEffect, useState } from "react";
import { NewsItem } from "@/types/types";
import { Badge } from "@/components/ui/badge";

export default function Page({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const [newsData, setNewsData] = useState<NewsItem[] | null>(null);

  const { mutateAsync: getNewsByTagFn, isPending: loadingResponse } =
    useGetNewsByTag();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getNewsByTagFn({ tag });
        setNewsData(res.data.newsList);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  if (loadingResponse)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <DashboardLoader />
      </div>
    );

  return (
    <div className=" flex-1 max-h-full overflow-y-auto overflow-x-hidden flex flex-col items-center w-full justify-start">
      <h1 className=" text-xl p-2 font-bold tracking-[2px] animate-pulse">
        {tag.includes("%20") ? tag.split("%20").join(" ") : tag}
      </h1>

      <div className="flex-1 max-h-full overflow-y-auto overflow-x-hidden flex flex-col items-center w-full justify-start">
        {newsData && <HoverEffect items={newsData!} />}
      </div>
    </div>
  );
}
