import { useMutation } from "@tanstack/react-query"
import { createNewUser, loginUser, logoutUser } from "./api"
import { LoginUser, USER } from "@/types/types"

export const useSignIn = () => {
    return useMutation({
        mutationFn : (User:USER) => createNewUser(User)
    })
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