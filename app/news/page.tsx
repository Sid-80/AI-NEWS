"use client"

import { getNewsPublicUrl } from "@/lib/API-URLS";
import axios from "axios";
import { useEffect, useState } from "react"

export default function Page() {
    const [newsData,setNewsData] = useState(null);

    useEffect(()=>{
        const getData = async() => {
            const res = await axios.get(getNewsPublicUrl);
            console.log(res.data)
        }
        getData();
    },[])

  return (
    <div>Page</div>
  )
}