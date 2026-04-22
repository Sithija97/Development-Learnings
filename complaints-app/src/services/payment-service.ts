import { IPaymentData } from "./../models/index";
import axios, { AxiosRequestConfig } from "axios";

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

// create payment
const createPayment = async (paymentData: IPaymentData, token: string) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.post("/create-payment", paymentData);
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

//get all payments
const getAllPayments = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.get("/get-all-payments");
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

// get payments by user
const getPaymentByUser = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.get("/get-payments-by-user");
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

const paymentService = {
  createPayment,
  getAllPayments,
  getPaymentByUser,
};

export default paymentService;
