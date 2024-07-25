"use client"
import { Button } from "@/components/ui/button";
import ThemeTogglebutton from "../ThemeToggle";
import { LogOutIcon, SettingsIcon, User2Icon } from "lucide-react";
import { useLogout } from "@/lib/react-query/mutations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { logOut } from "@/lib/redux/Auth/auth-slice";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const {
        mutateAsync: logOutFn,
        isPending: loadingResponse,
        isSuccess,
        isError
      } = useLogout();

    const router = useRouter();
    
    const dispatch = useDispatch()

    const id = useSelector((state:RootState)=>state.auth.id);
    const accessToken = useSelector((state:RootState)=>state.auth.accessToken);

    const LogoutHandler = async() => {
        try {
            await logOutFn({id,accessToken})
            if(isSuccess){
                dispatch(logOut());
                router.push('/signin');
            }
        } catch (er) {
            console.log(er)
        }
    }
  return (
    <div className=" bg-[#D2DAFF] flex p-2 px-4 items-center justify-between dark:bg-[#1B2430]">
      <h1 className="text-lg font-medium">Dashboard</h1>
      <div className="flex gap-1">
        <Button variant={"ghost"} size={"icon"}>
            <User2Icon className="w-6 h-6" />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
            <SettingsIcon className="w-6 h-6" />
        </Button>
        <Button onClick={()=>LogoutHandler()} variant={"ghost"} size={"icon"}>
            <LogOutIcon className="w-6 h-6" />
        </Button>
        <ThemeTogglebutton />
      </div>
    </div>
  );
}
