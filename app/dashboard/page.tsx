"use client";
import Categories from "@/components/shared/dashboard/Categories";
import FilterNews from "@/components/shared/dashboard/FilterNews";
import DashboardLoader from "@/components/shared/dashboard/Loader";
import { useToast } from "@/components/ui/use-toast";
import { useCheckHealth } from "@/lib/react-query/mutations";
import { logOut } from "@/lib/redux/Auth/auth-slice";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const id = useSelector((state: RootState) => state.auth.id);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    mutateAsync: checkHealthFn,
    isPending: loadingResponse,
    isSuccess,
    isError,
  } = useCheckHealth();
  const { toast } = useToast();

  if (!isAuth) router.push("/signin");

  useEffect(() => {
    const check = async () => {
      try {
        await checkHealthFn({ id, accessToken });
      } catch (err) {
        toast({
          title: "Session expired!",
          description: "Re-login. It's for your safety",
        });
        dispatch(logOut());
        router.push("/signin");
      }
    };
    check();
  }, []);

  if (loadingResponse)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <DashboardLoader />
      </div>
    );

  return <div className=" flex-1 flex flex-col items-center justify-around">
    <div className="flex w-full items-center justify-around">
    <Categories />
    <FilterNews />
    </div>
  </div>;
}