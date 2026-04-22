import axios, { AxiosRequestConfig } from "axios";
import {
  IReportRequestData,
  IReportStatus,
  IUploadReportData,
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

// report request
const requestReport = async (
  requestData: IReportRequestData,
  token: string
) => {
  const axiosInstance = createAxiosInstance(token);
  const formData = new FormData();

  if (requestData.fileName) {
    if (Array.isArray(requestData.fileName)) {
      requestData.fileName.forEach((file) => {
        formData.append("fileName", file);
      });
    } else {
      formData.append("fileName", requestData.fileName);
    }
  }
  formData.append("title", requestData.title);
  formData.append("description", requestData.description);
  formData.append("category", String(requestData.category));
  formData.append("status", String(requestData.status));

  try {
    const response = await axiosInstance.post(
      "/police-report-request",
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

// change report status
const changeReportStatus = async (statusData: IReportStatus, token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.patch(
      "/change-report-status",
      statusData
    );
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

const uploadPoliceReport = async (
  requestData: IUploadReportData,
  token: string
) => {
  const axiosInstance = createAxiosInstance(token);
  const formData = new FormData();

  if (requestData.fileName) {
    if (Array.isArray(requestData.fileName)) {
      requestData.fileName.forEach((file) => {
        formData.append("fileName", file);
      });
    } else {
      formData.append("fileName", requestData.fileName);
    }
  }
  formData.append("policeReportRequestId", requestData.policeReportRequestId);
  formData.append("userId", requestData.userId);

  try {
    const response = await axiosInstance.post(
      "/upload-police-report",
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

// get report by user
const getReportByUser = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.get("/get-police-reports-by-user");
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

// get all reports
const getReports = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.get("/get-police-reports");
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

// police-report-request-list
const getReportRequestList = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.get("/police-report-request-list");
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

// police-report-request-list-by-user
const getReportRequestListByUser = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.get(
      "/police-report-request-list-by-user"
    );
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

// get file 
const downloadPdf = async (token: string, url: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    console.log("hwgdwjdqwvd", url)
    const data = {
      filePath: url
    }
    const response = await axiosInstance.post(
      "/get-file", data,
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

const policeReportService = {
  requestReport,
  changeReportStatus,
  uploadPoliceReport,
  getReportByUser,
  getReports,
  getReportRequestList,
  getReportRequestListByUser,
  downloadPdf
};

export default policeReportService;
