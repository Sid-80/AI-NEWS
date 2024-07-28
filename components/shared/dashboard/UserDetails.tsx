"use client"
import { useEffect, useState } from "react";
import { getUserDetailsUrl } from "@/lib/API-URLS";
import createAxiosInstance from "@/lib/ProtectedAxiosInstance";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";





export default function UserDetails() {
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
        <>
            <DropdownMenuItem>{userData.email}</DropdownMenuItem>
            <DropdownMenuItem>{userData.firstName} {userData.lastName}</DropdownMenuItem>
        </>
    );
}
