"use client"
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { useEffect, useState } from "react";
import { getUserDetailsUrl } from "@/lib/API-URLS";
import createAxiosInstance from "@/lib/ProtectedAxiosInstance";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";





export default function Page() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const router = useRouter();


  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const axiosInstance = createAxiosInstance(accessToken);
        const response = await axiosInstance.get(
          getUserDetailsUrl
        );
        setUserData(response.data.data.user);
      } catch (error) {
        console.error(error);
        // Redirect to /login
        router.push('/dashboard')
      }
    }
    getData();
  }, [])


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
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>
              First Name: {userData.firstName}
            </p>
            <p>
              Last Name: {userData.lastName}
            </p>
            <p>
              Email: {userData.email}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="hidden sm:flex items-center justify-center w-full p-4">
        <Image
          src="/newDash2.png"
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
