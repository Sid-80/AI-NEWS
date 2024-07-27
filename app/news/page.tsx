"use client"

import HomeNavbar from "@/components/shared/HomeNavbar";
import { ExpandableCardDemo } from "@/components/ui/expandable-card";
import { getNewsPublicUrl } from "@/lib/API-URLS";
import axiosInstance from "@/lib/AxiosInstance";
import { NEWS } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Page() {
    const [newsData,setNewsData] = useState<NEWS[] | null>(null); 

    useEffect(()=>{
        const getData = async() => {
            const res = await axiosInstance.get(getNewsPublicUrl);
            setNewsData(res.data);
            console.log(res.data)
        }
        getData();
    },[])
    
  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden">
      <HomeNavbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:py-10 sm:gap-4">
        {/* {
          newsData && newsData.map((news)=>(
            <NewsCard news={news} key={news._id} />
          ))
        } */}

        {newsData && <ExpandableCardDemo ctxLink="/signin" ctxText="Read" cards={newsData} />}
        <Link href={'/signin'} className="underline text-primary">Login to read more news!!</Link>
      </div>
    </div>
  )
}
