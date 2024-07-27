"use client";
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
        setNews(res.data.slice(0, 8));
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return <div className=" flex-1 max-h-full overflow-y-auto overflow-x-hidden flex flex-col items-center w-full justify-start">
    
  </div>;
}
