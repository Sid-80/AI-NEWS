"use client"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useGetNewsTags } from "@/lib/react-query/mutations";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Categories() {
  const pathname = usePathname();

  const [tags,setTags] = useState<any[] | null>(null);

  const {
    mutateAsync: getNewsTagsFn,
    isPending: loadingResponse
  } = useGetNewsTags();

  useEffect(()=>{

    const getData = async() => {
      try {
        const res = await getNewsTagsFn();
        setTags(res.data.slice(0,8))
        tags
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[])

  const components: { title: string; href: string }[] = [
    {
      title: "Latest",
      href: `/dashboard`,
    },
    {
      title: "Politics",
      href: "/dashboard/politics",
    },
    {
      title: "Tech",
      href: "/dashboard/tech",
    },
    {
      title: "Budget",
      href: "/dashboard/budget",
    },
    {
      title: "Company",
      href: "/dashboard/company",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem key={`latest-0000`}>
            <Link href={`/dashboard`} legacyBehavior passHref>
              <NavigationMenuLink className={`${pathname === "/dashboard" ? "bg-primary text-white":"dark:bg-[#1B2430] dark:hover:bg-[#121211] hover:bg-[#D2DAFF]/60 bg-[#D2DAFF]"} font-semibold rounded-md p-2 px-3 `}>
                Latest
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        {tags && tags.map((comp, index) => (
          <NavigationMenuItem key={`${comp.tag}-${index}`}>
            <Link href={`/dashboard/${comp.tag}`} legacyBehavior passHref>
              <NavigationMenuLink className={`${pathname.includes(comp.tag) ? "bg-primary text-white":"dark:bg-[#1B2430] dark:hover:bg-[#121211] hover:bg-[#D2DAFF]/60 bg-[#D2DAFF]"} font-semibold rounded-md p-2 px-3 `}>
                {comp.tag}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
