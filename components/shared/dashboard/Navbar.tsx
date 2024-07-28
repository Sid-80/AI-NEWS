"use client";
import { Button } from "@/components/ui/button";
import ThemeTogglebutton from "../ThemeToggle";
import { LogOutIcon, SettingsIcon, User2Icon } from "lucide-react";
import { useLogout } from "@/lib/react-query/mutations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { logOut } from "@/lib/redux/Auth/auth-slice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../Logo";
import Categories from "./Categories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserDetails from "./UserDetails";


export default function Navbar() {
  const {
    mutateAsync: logOutFn,
    isPending: loadingResponse,
    isSuccess,
    isError,
  } = useLogout();

  const router = useRouter();

  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.auth.id);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const LogoutHandler = async () => {
    try {
      const res = await logOutFn({
        id, accessToken
      });
      if (res.status === 200) {
        dispatch(logOut());
        router.push("/signin");
      }
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <div className=" bg-[#D2DAFF] w-full flex p-2 items-center justify-around dark:bg-[#1B2430]">
      <DropdownMenu>
        <div className="flex gap-2 items-center justify-center">
          <Logo />
        </div>
        <div className="flex gap-1">
          <Categories />
          <DropdownMenuTrigger><User2Icon className="w-6 h-6" /></DropdownMenuTrigger>
          {/* <Button onClick={() => LogoutHandler()} variant={"ghost"} size={"icon"}>
            <LogOutIcon className="w-6 h-6" />
          </Button> */}
          <ThemeTogglebutton />
        </div>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <UserDetails/>
          <DropdownMenuItem onClick={() => LogoutHandler()}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
