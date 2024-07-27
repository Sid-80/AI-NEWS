"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { useLogin } from "@/lib/react-query/mutations";
import { useToast } from "../ui/use-toast";
import Loader from "../shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "@/lib/redux/Auth/auth-slice";
import { RootState } from "@/lib/redux/store";

const FormSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email required!",
  }),
  password: z.string().min(8, {
    message: "Minimum Length should be 8",
  }),
});

export function SigninForm() {
  const router = useRouter();
  const dispatch = useDispatch()
  const {
    mutateAsync: signinUser,
    isPending: loadingResponse,
    isError,
    isSuccess,
  } = useLogin();

  const isAuth = useSelector((state:RootState)=>state.auth.isAuth);

  if(isAuth) router.push('/dashboard')

  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { email, password } = data;
      const res = await signinUser({
        password,
        email,
      });
      if (res.status === 200) {
        toast({ title: "Welcome to SMARTBRIEFS!" });
        dispatch(logIn({
          id:res.data.user._id,
          email: res.data.user.email,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          isAuth:true
        }))
        router.push('/dashboard')
      }
    } catch (err: any) {
      toast({
        title: "Error!!",
        description: err.response.data.error,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-2 flex flex-col items-center justify-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full p-4">
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
            <FormItem className="w-full p-4">
              <div className="flex w-full items-center justify-between">
                <FormLabel className="px-2">Password</FormLabel>
                <Link
                  href={`/forget-password`}
                  className=" text-xs text-gray-400 underline"
                >
                  Forgot password?{" "}
                </Link>
              </div>
              <FormControl>
                <Input type="password" placeholder="Password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className=" text-xs text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href={`/signup`} className=" underline">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-4 w-full">
          <p className=" text-xs text-gray-400 w-full"></p>

          <div className="flex items-center justify-center">
            <Button
              disabled={loadingResponse}
              type="submit"
              className="flex gap-2 font-semibold"
            >
              {loadingResponse ? (
                <Loader />
              ) : (
                <>
                  Login <LogInIcon className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
