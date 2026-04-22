import axios, { AxiosRequestConfig } from "axios";
import { IFineData } from "../models";

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

// create fine
const createFine = async (fineData: IFineData, token: string) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.post("/create-fine", fineData);
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

// get all fines
const getAllFines = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.get("/get-all-fines");
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

// user specific fines
const userSpecificFines = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.get("/user-specific-fines");
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

const fineService = {
  createFine,
  getAllFines,
  userSpecificFines,
};

export default fineService;
