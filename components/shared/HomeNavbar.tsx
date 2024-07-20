import { ArrowUpRightFromSquare, LogInIcon, NewspaperIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import ThemeTogglebutton from "./ThemeToggle";
import Link from "next/link";

export default function HomeNavbar() {
  return (
    <div className="bg-[#D2DAFF] dark:bg-[#1B2430] p-2 flex w-full items-center justify-around">
      <div>
        <Avatar className="w-12 h-12">
          <AvatarImage src="/2.png" alt="" className="dark:hidden" />
          <AvatarImage src="/1.png" alt="" className="hidden dark:block" />
        </Avatar>
      </div>
      <div className="flex gap-2">
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
        <ThemeTogglebutton />
      </div>
    </div>
  );
}
