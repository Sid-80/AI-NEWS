"use client"

import HomeNavbar from "@/components/shared/HomeNavbar";
import { getNewsPublicUrl } from "@/lib/API-URLS";
import axiosInstance from "@/lib/AxiosInstance";
import { useEffect, useState } from "react"

export default function Page() {
    const [newsData,setNewsData] = useState(null);

    useEffect(()=>{
        const getData = async() => {
            const res = await axiosInstance.get(getNewsPublicUrl);
            console.log(res.data)
        }
        getData();
    },[])

  return (
    <div>
      <HomeNavbar />
    </div>
  )
}