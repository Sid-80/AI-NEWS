"use client";

import { useGetNewsTags } from "@/lib/react-query/mutations";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react";

import { useRouter } from "next/navigation";
import { CategoriesMenu } from "./CategoriesMenu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type TagItem = {
  tag: string;
  count: string;
};

export default function Categories() {
  const pathname = usePathname();

  const [tags, setTags] = useState<TagItem[] | null>([]);
  const [Alltags, setAllTags] = useState<TagItem[] | null>([]);
  const { mutateAsync: getNewsTagsFn, isPending: loadingResponse } =
    useGetNewsTags();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getNewsTagsFn();
        setTags(res.data.slice(0, 8));
        setAllTags(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return tags ? (
    <>
      <Link href={"/dashboard"}>
        <Button variant="outline" className="hover:bg-primary">
          Latest
        </Button>
      </Link>
      
      <CategoriesMenu Tags={Alltags!} />
    </>
  ) : (
    <></>
  );
}
