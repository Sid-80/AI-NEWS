import { USER } from "@/types/types";
import axios from "axios";
import { healthUrl, logoutUrl, signinUrl, signupUrl, verifyOtpUrl } from "../API-URLS";
import createAxiosInstance from "../ProtectedAxiosInstance";

export const createNewUser = async (User: USER) => {
    const response = await axios.post(
      signupUrl,
      User,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
};

export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(
      signinUrl,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
};

export const logoutUser = async (_id: string, accessToken:string) => {
    const axiosInstance = createAxiosInstance(accessToken);
    const response = await axiosInstance.post(
      logoutUrl,
      { _id }
    );
    return response;
};

export const checkHealth = async (_id: string, accessToken:string) => {
    const axiosInstance = createAxiosInstance(accessToken);
    const response = await axiosInstance.get(
      healthUrl
    );
    return response;
};

export const verifyOtp = async (otp: string, email:string) => {
    const e = email.split("%40")[0] +"@"+ email.split("%40")[1];
    const response = await axios.post(
      verifyOtpUrl,
      { otp,email:e},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
};