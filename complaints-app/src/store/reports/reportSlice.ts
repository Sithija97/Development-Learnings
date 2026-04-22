import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IReportRequestData,
  IReportStatus,
  IReportsInitialState,
  IUploadReportData,
} from "../../models";
import { RootState } from "../store";
import policeReportService from "../../services/police-reports-service";

const initialState: IReportsInitialState = {
  reports: [],
  userReports: [],
  reportRequests: [],
  userReportRequests: [],
  selectedReportRequestId: 0,
  isError: false,
  isGetAllReportsLoading: false,
  isGetReportByUserLoading: false,
  isGetAllReportRequestsLoading: false,
  isGetReportRequestByUserLoading: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create report request
export const createReportRequest = createAsyncThunk(
  "reports/createReportRequest",
  async (reportData: IReportRequestData, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await policeReportService.requestReport(reportData, user?.token!);
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

// change report status
export const changeReportStatus = createAsyncThunk(
  "reports/changeReportStatus",
  async (statusData: IReportStatus, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await policeReportService.changeReportStatus(
        statusData,
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

// get all reports
export const getAllReports = createAsyncThunk(
  "reports/getAllReports",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await policeReportService.getReports(user?.token!);
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

// get report by user
export const getReportByUser = createAsyncThunk(
  "reports/getReportByUser",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await policeReportService.getReportByUser(user?.token!);
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

// get all report requests
export const getAllReportRequests = createAsyncThunk(
  "reports/getAllReportRequests",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await policeReportService.getReportRequestList(user?.token!);
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

// get report request by user
export const getReportRequestByUser = createAsyncThunk(
  "reports/getReportRequestByUser",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await policeReportService.getReportRequestListByUser(user?.token!);
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

// upload report
export const uploadReport = createAsyncThunk(
  "reports/uploadReport",
  async (uploadReportData: IUploadReportData, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await policeReportService.uploadPoliceReport(
        uploadReportData,
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

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setSelectedReportRequestId(state, { payload }) {
      state.selectedReportRequestId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReports.pending, (state) => {
        state.isGetAllReportsLoading = true;
      })
      .addCase(getAllReports.fulfilled, (state, action) => {
        state.isGetAllReportsLoading = false;
        state.isSuccess = true;
        state.reports = action.payload!;
      })
      .addCase(getAllReports.rejected, (state, action) => {
        state.isGetAllReportsLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getReportByUser.pending, (state) => {
        state.isGetReportByUserLoading = true;
      })
      .addCase(getReportByUser.fulfilled, (state, action) => {
        state.isGetReportByUserLoading = false;
        state.isSuccess = true;
        state.userReports = action.payload!;
      })
      .addCase(getReportByUser.rejected, (state, action) => {
        state.isGetReportByUserLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getAllReportRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReportRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reportRequests = action.payload!;
      })
      .addCase(getAllReportRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getReportRequestByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReportRequestByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userReportRequests = action.payload!;
      })
      .addCase(getReportRequestByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, setSelectedReportRequestId } = reportSlice.actions;

export default reportSlice.reducer;
