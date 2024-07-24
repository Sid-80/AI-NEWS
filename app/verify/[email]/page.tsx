"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useVerifyOtp } from "@/lib/react-query/mutations";
import { LogInIcon } from "lucide-react";
import Loader from "@/components/shared/Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { email: string } }) {
  const router = useRouter();
  const { email } = params;
  const [otp, setOtp] = useState("");
  const { mutateAsync: verifyUserOtp, isPending: loadingResponse } =
    useVerifyOtp();

    
  const submitHandler = async () => {
    try {
      const res = await verifyUserOtp({ email, otp });

      if(res?.status === 200 || res?.status===201){
        toast.success("Email Verified!!");
        router.push('/signin');
      }
    } catch (err:any) {
      console.log(err)
      toast.error("Error occured")
    }
  };

  return (
    <div className="flex flex-col overflow-hidden relative h-screen w-screen gap-4 items-center justify-center">
      <div className="absolute top-4 left-4">
        <Logo />
      </div>
      <h1 className=" font-bold text-lg sm:text-2xl">Verify your account!</h1>
      <InputOTP
        onChange={(e) => setOtp(e)}
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button disabled={loadingResponse} onClick={() => submitHandler()} variant={"default"}>
        {loadingResponse ? (
          <Loader />
        ) : (
          <>
            Register <LogInIcon className="w-5 h-5" />
          </>
        )}
      </Button>
    </div>
  );
}
