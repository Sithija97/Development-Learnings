import axios, { AxiosRequestConfig } from "axios";
import { ICommentData, ILikeData, IPostData } from "../models";

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

const getCommunityPosts = async (token: string) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.get("/get-community-posts");
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

const createCommunityPost = async (postData: IPostData, token: string) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.post(
      "/create-community-post",
      postData
    );
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

const likeCommunityPost = async (likeData: ILikeData, token: string) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.post("/like-community-post", likeData);
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

const commentCommunityPost = async (
  commentData: ICommentData,
  token: string
) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance.post(
      "/comment-community-post",
      commentData
    );
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

const deleteCommunityPosts = async (deleteData: any, token: string) => {
  const axiosInstance = createAxiosInstance(token);
  try {
    const response = await axiosInstance.post(
      "/delete-community-post",
      deleteData
    );
    return response.data;
  } catch (error) {
    // Handle error here
    console.log(`error : ${error}`);
    throw error;
  }
};

const communityService = {
  getCommunityPosts,
  createCommunityPost,
  likeCommunityPost,
  commentCommunityPost,
  deleteCommunityPosts,
};

export default communityService;
