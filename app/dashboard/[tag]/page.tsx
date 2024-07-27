"use client";
import DashboardLoader from "@/components/shared/dashboard/Loader";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGetNewsByTag } from "@/lib/react-query/mutations";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const [news, setNews] = useState([]);

  const { mutateAsync: getNewsByTagFn, isPending: loadingResponse } =
    useGetNewsByTag();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getNewsByTagFn({ tag });
        setNews(res.data.newsList);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  if(loadingResponse) return (
    <div className="flex items-center justify-center w-full h-full">
    <DashboardLoader />
  </div>
  )

  return <div className=" flex-1 max-h-full overflow-y-auto overflow-x-hidden flex flex-col items-center w-full justify-start">

    <HoverEffect items={news} />

  </div>;
}
