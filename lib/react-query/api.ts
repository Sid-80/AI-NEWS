import { USER, UserResetPassword } from "@/types/types";
import axios from "axios";
import { healthUrl, forgetPasswordUrl, logoutUrl, signinUrl, signupUrl, verifyOtpUrl, resetPasswordUrl, getNewsTagsUrl, getNewsByTagUrl, getAllNewsUrl } from "../API-URLS";
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

export const forgetPassword = async (email: string) => {
    const response = await axios.post(
      forgetPasswordUrl,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
};

export const resetPassword = async ( data:UserResetPassword) => {
  const response = await axios.post(
    resetPasswordUrl,
    { email:data.email, token:data.token, newPassword : data.password },
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

export const newsTags = async () => {
  const response = await axios.get(
    getNewsTagsUrl
  );
  return response;
};

export const getNewsByTag = async (tag:string) => {
  const response = await axios.get(
    `${getNewsByTagUrl}/${tag}?limit=100`
  );
  return response;
};

export const getAllNews = async (limit:number,before:number | null,after:number | null) => {
  let response;
  if(before && after){
    response = await axios.get(
      `${getAllNewsUrl}?limit=${limit}&after=${after}&before=${before}`
    );
  }else if(before){
    response = await axios.get(
      `${getAllNewsUrl}?limit=${limit}&before=${before}`
    );
  }else if(after){
    response = await axios.get(
      `${getAllNewsUrl}?limit=${limit}&after=${after}`
    );
  }else{
    response = await axios.get(
      `${getAllNewsUrl}?limit=${limit}`
    );
  }

  return response;
};