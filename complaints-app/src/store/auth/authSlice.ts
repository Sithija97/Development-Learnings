import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAuthInitialState,
  ILoginData,
  IRegisterData,
  IUser,
  IUpdateData,
  IVerifyUserData,
  IForgotPWData,
  IDashBoardDataType,
} from "../../models";
import authService from "../../services/auth-service";
import { RootState } from "../store";

// Get user from localStorage
const user: IUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;

const initialDashboardValues : IDashBoardDataType = {
  police: null || {
    user: {
      userCount: 0,
      policeUserCount: 0,
    },
    complaint: {
      activeComplaints: 0,
      removedComplaints: 0,
    },
    fine: {
      activeFines: 0,
      completedFines: 0,
    },
    policeReport: {
      policeReports: 0,
      allPoliceReportRequests: 0,
      pendingPoliceReportRequests: 0,
    },
    revenue: {
      pendingFineAmount: 0,
      completedFineAmount: 0,
      totalFineAmount: 0
    }
  },
  user: null || {
    complaint: {
    activeComplaints: 0,
    removedComplaints: 0
  },
  fine: {
    activeFines: 0,
    complatedFines: 0
  },
  policeReport: {
    policeReports: 0,
    allPoliceReportRequests: 0
  }}
};

const initialState: IAuthInitialState = {
  user: user || null,
  users: [],
  dashboardData: initialDashboardValues,
  isError: false,
  isSuccess: false,
  isDashboardDataLoading: false,
  isGetAllUsersLoading: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user: IRegisterData, thunkAPI) => {
    try {
      return await authService.registerUser(user);
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

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: ILoginData, thunkAPI) => {
    try {
      return await authService.loginUser(user);
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

// get all users
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await authService.getAllUsers(user?.token!);
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

// get all users
export const getDashboardData = createAsyncThunk(
  "auth/getDashboardData",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await authService.getDashboardData(user?.token!);
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

// update user
export const update = createAsyncThunk(
  "auth/update",
  async (userData: IUpdateData, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await authService.updateUser(userData, user?.token!);
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

// forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: IForgotPWData, thunkAPI) => {
    try {
      return await authService.forgotUserPassword(data);
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

// verify user
export const verify = createAsyncThunk(
  "auth/verify",
  async (userData: IVerifyUserData, thunkAPI) => {
    try {
      return await authService.verifyUser(userData);
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

// upload profile Img user
export const uploadProfileImg = createAsyncThunk(
  "auth/uploadProfileImg",
  async (data: any, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await authService.uploadProfilePicture(data, user?.token!);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      state.users = [];
      state.dashboardData = initialDashboardValues;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload!;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload!;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload!;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(uploadProfileImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfileImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload!;
      })
      .addCase(uploadProfileImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isGetAllUsersLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isGetAllUsersLoading = false;
        state.isSuccess = true;
        state.users = action.payload!;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isGetAllUsersLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(getDashboardData.pending, (state) => {
        state.isDashboardDataLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isDashboardDataLoading = false;
        state.isSuccess = true;
        state.dashboardData = action.payload!;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isDashboardDataLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
