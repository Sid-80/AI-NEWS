import { useMutation } from "@tanstack/react-query";

import {
  checkHealth,
  createNewUser,
  forgetPassword,
  loginUser,
  logoutUser,
  verifyOtp,
  resetPassword,
  newsTags,
  getNewsByTag,
  getAllNews,
} from "./api";
import {
  LoginUser,
  LogoutUser,
  USER,
  UserForgetRequest,
  UserResetPassword,
  UserVerify,
} from "@/types/types";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (User: USER) => createNewUser(User),
    onError: (error) => {
      // Optionally do something with the error
      console.error("Error signing in:", error);
      return error;
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (User: LoginUser) => loginUser(User.email, User.password),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: ({ id, accessToken }: LogoutUser) =>
      logoutUser(id, accessToken),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (cred: UserVerify) => verifyOtp(cred.otp, cred.email),
  });
};

export const useForgetPasswordRequest = () => {
  return useMutation({
    mutationFn: (User: UserForgetRequest) => forgetPassword(User.email),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (Data: UserResetPassword) => resetPassword(Data),
    onError: (error) => {
      // Optionally do something with the error
      console.error("Error signing in:", error);
      return error;
    },
  });
};

export const useCheckHealth = () => {
  return useMutation({
    mutationFn: ({ id, accessToken }: any) => checkHealth(id, accessToken),
  });
};
export const useGetNewsTags = () => {
  return useMutation({
    mutationFn: () => newsTags(),
  });
};

export const useGetNewsByTag = () => {
  return useMutation({
    mutationFn: ({ tag }: { tag: string }) => getNewsByTag(tag),
  });
};

export const useGetAllNews = () => {
  return useMutation({
    mutationFn: ({
      before,
      after,
      limit,
    }: {
      limit: number;
      before: number;
      after: number;
    }) => getAllNews(limit,before,after),
  });
};
