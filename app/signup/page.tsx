import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { SignupForm } from "@/components/Forms/SignUpForm";

export default function Page() {

  return (
    <div className="flex relative h-screen w-screen">
      <div className=" absolute top-5 left-5">
        <Link href={"/"}>
        <Logo />
        </Link>
      </div>

      <div className="flex items-center justify-center w-full">
        <Card className="w-[350px] sm:w-[400px] xl:w-[500px] border-none">
          <CardHeader className="flex gap-3 flex-col text-center">
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <SignupForm />
          </CardContent>
        </Card>
      </div>
      <div className="hidden sm:flex items-center justify-center w-full p-4">
        <Image
          src='/newDash2.png'
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover max-h-full object-right-top"
          draggable={false}
        />
      </div>
    </div>
  );
}
