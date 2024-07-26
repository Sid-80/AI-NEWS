"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signupUrl } from "@/lib/API-URLS";
import axiosInstance from "@/lib/AxiosInstance";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@/lib/react-query/mutations";
import Loader from "../shared/Loader";

import { useToast } from "../ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { UserResetPassword } from "@/types/types"
import { resetPassword } from "@/lib/react-query/api";
import { useSearchParams } from "next/navigation";


const FormSchema = z
  .object({
    token: z.string().min(3, {
      message: "Minimum Length should be 3",
    }),
    email: z.string().email().min(1, {
      message: "Email required!",
    }),
    password: z.string().min(8, {
      message: "Minimum Length should be 8",
    }),
    confirmPwd: z.string().min(8, {
      message: "Minimum Length should be 8",
    }),
  })
  .refine((data) => data.password === data.confirmPwd, {
    message: "Passwords don't match",
    path: ["confirmPwd"],
  });

export function ResetPasswordForm() {

  const searchParams = useSearchParams();

  console.log(searchParams.get("token"));

  const router = useRouter();
  const {
    mutateAsync: newUser,
    isPending: loadingResponse,
    isSuccess,
    isError
  } = useSignIn();

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  if (isAuth) router.push('/dashboard')

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: searchParams.get("token") ?? "",
      email: searchParams.get("email") ?? "",
      password: "",
      confirmPwd: "",
    },
  });
  const { toast } = useToast();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { email, token, password } = data;

      const Data: UserResetPassword = { email, token, password }

      console.log(Data)
      const res = await resetPassword(Data);

      toast({ title: "Password reset success!" });
      setTimeout(() => {
        router.push('/signin');
      }, 2000);

    } catch (err: any) {
      toast({
        title: `${err.response.data.message}`,
      });
    }

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center justify-center"
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel className="px-2">Token</FormLabel>
              <FormControl>
                <Input placeholder="Token..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel className="px-2">Email</FormLabel>
              <FormControl>
                <Input placeholder="Your-cool-email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel className="px-2">New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPwd"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel className="px-2">Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm New Password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 w-full">
          <p className=" text-xs text-gray-400 w-full"></p>

          <div className="flex items-center justify-center">
            <Button type="submit" className="flex gap-2 font-semibold">
              {loadingResponse ? (
                <Loader />
              ) : (
                <>
                  Reset Password <LogInIcon className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
