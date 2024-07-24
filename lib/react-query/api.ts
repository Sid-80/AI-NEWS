import { USER } from "@/types/types";
import axios from "axios";
import { logoutUrl, signinUrl, signupUrl, verifyOtpUrl } from "../API-URLS";

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

export const logoutUser = async (_id: string) => {
    const response = await axios.post(
      logoutUrl,
      { _id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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