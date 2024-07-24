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
import { AlignJustify, ArrowUpRightFromSquare, LogInIcon, NewspaperIcon } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

export default function HomeSideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="sm:hidden flex" size={"icon"} variant="ghost">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className=" flex items-center justify-center">
            <Logo />
          <SheetDescription>
            Smart News For Smart Readers
          </SheetDescription>
        </SheetHeader>
        <div className="flex p-6 flex-col gap-4">

        <Button>
          <Link className="flex gap-2" passHref href={"/news"}>
            News <NewspaperIcon className="w-5 h-5" />
          </Link>
        </Button>
        <Button>
          <Link className="flex gap-2" passHref href={"/signin"}>
            Login
            <LogInIcon className="w-5 h-5" />
          </Link>
        </Button>
        <Button>
        <Link className="flex gap-2" passHref href={"/signin"}>
            Signup
            <ArrowUpRightFromSquare className="w-5 h-5" />
          </Link>
        </Button>

        </div>
      </SheetContent>
    </Sheet>
  );
}
