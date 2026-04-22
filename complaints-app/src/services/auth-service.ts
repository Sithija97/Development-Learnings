import axios, { AxiosRequestConfig } from "axios";
import {
  IForgotPWData,
  ILoginData,
  IRegisterData,
  IUpdateData,
  IVerifyUserData,
} from "../models";

const BASE_URL = "http://localhost:3000/api";

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

// get all users
const getAllUsers = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.get("/get-all-users");
    return response.data;
  } catch (error) {
    // Handle error here
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

// upload profile picture
// const uploadProfilePicture = async (data: any, token: string) => {
//   const axiosInstance = createAxiosInstance(token);
//   try {
//     const response = await axiosInstance.post(
//       `${BASE_URL}/upload-profile-picture`,
//       data
//     );
//     localStorage.setItem("user", JSON.stringify(response.data));
//     return response.data;
//   } catch (error) {
//     console.log(`error : ${error}`);
//     throw error;
//   }
// };

const uploadProfilePicture = async (
  requestData: any,
  token: string
) => {
  const axiosInstance = createAxiosInstance(token);
  const formData = new FormData();

  console.log("requestData", requestData)
  if (requestData.filename) {
    console.log("requestData", requestData)
    if (Array.isArray(requestData.filename)) {
      requestData.filename.forEach((file: any) => {
        formData.append("fileName", file);
      });
    } else {
      formData.append("fileName", requestData.filename);
    }
  }

  try {
    const response = await axiosInstance.post(
      "/upload-profile-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Error:", error);
    throw error;
  }
};

// get dahsboard data
const getDashboardData = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.get("/get-dashboard-data");
    return response.data;
  } catch (error) {
    console.log(`error : ${error}`);
    throw error;
  }
};

// get image 
const getImage = async (token: string, url: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    console.log("jjjjjjjjjjj", url)
    const data = {
      filePath: url
    }
    const response = await axiosInstance.post(
      "/get-image", data,
      {
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    console.log(`error : ${error}`);
    throw error;
  }
}

const authService = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  forgotUserPassword,
  verifyUser,
  uploadProfilePicture,
  getDashboardData,
  getImage,
};

export default authService;
