import axios, { AxiosRequestConfig } from "axios";
import { IContactPersonData } from "../models";

const BASE_URL = "http://192.168.1.6:3000/api";

const createAxiosInstance = (token: string) => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.create(config);
};

// create Contacts
const createContacts = async (
  contactData: { userContactPersonData: IContactPersonData[] },
  token: string
) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.post(
      "/create-user-contact-person",
      contactData
    );
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

// get contact person
const getContacts = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.get("/get-all-contact-person");
    console.log(response)
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

const contactsService = {
  createContacts,
  getContacts,
};
export default contactsService;
