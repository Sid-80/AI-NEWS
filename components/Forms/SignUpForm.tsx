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

const FormSchema = z
  .object({
    firstName: z.string().min(3, {
      message: "Minimum Length should be 3",
    }),
    lastName: z.string().min(3, {
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

export function SignupForm() {
  const router = useRouter();
  const {
    mutateAsync: newUser,
    isPending: loadingResponse,
    isSuccess,
    isError
  } = useSignIn();

  const isAuth = useSelector((state:RootState)=>state.auth.isAuth);

  if(isAuth) router.push('/dashboard')

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPwd: "",
    },
  });
  const { toast } = useToast();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await newUser({
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
      });
        if (isSuccess)
          toast({title:"User Registered!!",description:" Check mail to verify mail"});

    } catch (err:any) {
      toast({
        title: `${err.response.data.error}`,
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
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel className="px-2">First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel className="px-2">Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name..." {...field} />
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
              <FormLabel className="px-2">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password..." {...field} />
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
              <FormLabel className="px-2">Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className=" text-xs text-center text-gray-400">
          Already have an account?{" "}
          <Link href={`/signin`} className=" underline">
            Sign in
          </Link>
        </p>

        <div className="flex flex-col gap-4 w-full">
          <p className=" text-xs text-gray-400 w-full"></p>

          <div className="flex items-center justify-center">
            <Button type="submit" className="flex gap-2 font-semibold">
              {loadingResponse ? (
                <Loader />
              ) : (
                <>
                  Register <LogInIcon className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
