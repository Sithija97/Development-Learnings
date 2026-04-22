import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CommunityPost,
  ICommentData,
  ICommunityInitialState,
  ILikeData,
  IPostData,
} from "../../models";
import { RootState } from "../store";
import communityService from "../../services/community-service";

const initialState: ICommunityInitialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get community posts
export const getAllCommunityPosts = createAsyncThunk(
  "community/getAllCommunityPosts",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await communityService.getCommunityPosts(user?.token!);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// create community posts
export const createCommunityPosts = createAsyncThunk(
  "community/createCommunityPosts",
  async (postData: IPostData, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await communityService.createCommunityPost(postData, user?.token!);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// like community posts
export const likeCommunityPosts = createAsyncThunk(
  "community/likeCommunityPosts",
  async (likeData: ILikeData, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await communityService.likeCommunityPost(likeData, user?.token!);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// comment community posts
export const commentCommunityPosts = createAsyncThunk(
  "community/commentCommunityPosts",
  async (commentData: ICommentData, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await communityService.commentCommunityPost(
        commentData,
        user?.token!
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCommunityPost = createAsyncThunk(
  "community/deleteCommunityPost",
  async (deleteData: any, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await communityService.deleteCommunityPosts(
        deleteData,
        user?.token!
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommunityPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCommunityPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = ([] as CommunityPost[]).concat(...action.payload);
      })
      .addCase(getAllCommunityPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = communitySlice.actions;

export default communitySlice.reducer;
