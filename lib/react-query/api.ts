import { USER } from "@/types/types";
import axios from "axios";
import { logoutUrl, signinUrl, signupUrl } from "../API-URLS";

export const createNewUser = async (User: USER) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = async (_id: string) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};