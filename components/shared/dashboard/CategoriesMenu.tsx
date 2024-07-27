import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";

type Props = {
  Tags: any[];
};

export function CategoriesMenu({ Tags }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = Tags.filter(item =>
    item.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="hover:bg-primary">Filter & Sort</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select News Category</SheetTitle>
        </SheetHeader>
        <div className="flex py-4 h-full flex-col justify-items-center">
          <Input
            id="name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />

          <div className="flex-1 my-2 overflow-y-auto overflow-x-hidden">
            {filteredItems.map((item, index) => (
              <Link href={`/dashboard/${item.tag}`} className="p-[2px]" key={index}>
                <h1 className="p-2 dark:hover:bg-primary hover:bg-[#D2DAFF]/60 rounded-sm w-full">{item.tag}</h1>
              </Link>
            ))}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
