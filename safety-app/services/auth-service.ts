import axios, { AxiosRequestConfig } from "axios";
import localStorage from "react-native-expo-localstorage";
import {
  IForgotPWData,
  ILoginData,
  IRegisterData,
  IUpdateData,
  IVerifyUserData,
} from "../models";

const BASE_URL = "http://192.168.1.6:3000/api"; // Replace with your backend API URL

const createAxiosInstance = (token: string) => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.create(config);
};

// Register a new user
const registerUser = async (userData: IRegisterData) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-user`, userData);

    return response.data;
  } catch (error) {
    console.log(`error : ${error}`);
    throw error;
  }
};

// Login user
const loginUser = async (userData: ILoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.log(`error : ${error}`);
    throw error;
  }
};

// update user
const updateUser = async (userData: IUpdateData, token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.patch(
      `${BASE_URL}/update-user`,
      userData
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(`error : ${error}`);
    throw error;
  }
};

// forgot password
const forgotUserPassword = async (data: IForgotPWData) => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, {
      data,
    });
    return response.data;
  } catch (error) {
    console.log(`error : ${error}`);
    throw error;
  }
};

// verify user
const verifyUser = async (userData: IVerifyUserData) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-user`, userData);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(`error : ${error}`);
    throw error;
  }
};

const authService = {
  registerUser,
  loginUser,
  updateUser,
  forgotUserPassword,
  verifyUser,
};

export default authService;
