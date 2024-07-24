import { useMutation } from "@tanstack/react-query"
import { createNewUser, loginUser, logoutUser, verifyOtp } from "./api"
import { LoginUser, USER, UserVerify } from "@/types/types"

export const useSignIn = () => {
    return useMutation({
      mutationFn: (User: USER) => createNewUser(User),
      onError: (error) => {
        // Optionally do something with the error
        console.error('Error signing in:', error);
        return error;
      },
    });
  }

export const useLogin = () => {
    return useMutation({
        mutationFn : (User:LoginUser) => loginUser(User.email,User.password)
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn : (_id:string) => logoutUser(_id)
    })
}

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn : (cred:UserVerify) => verifyOtp(cred.otp,cred.email)
    })
}