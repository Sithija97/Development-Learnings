import {
  IComplaintData,
  IComplaintsInitialState,
  IRemoveComplaintData,
} from "../../models/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import complaintService from "../../services/complaint-service";

const initialState: IComplaintsInitialState = {
  complaints: [],
  userComplaints: [],
  selectedComplaintId: 0,
  isError: false,
  isSuccess: false,
  isGetAllComplaintsLoading: false,
  isGetComplaintsByUserLoading: false,
  isLoading: false,
  message: "",
};

// create complaint
export const createComplaints = createAsyncThunk(
  "complaints/createComplaints",
  async (complaintData: IComplaintData, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await complaintService.createComplaint(
        complaintData,
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

// get all complaint
export const getAllComplaints = createAsyncThunk(
  "complaints/getAllComplaints",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await complaintService.getComplaints(user?.token!);
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

// get user specific complaint
export const getComplaintsByUser = createAsyncThunk(
  "complaints/getComplaintsByUser",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await complaintService.userSpecificComplaints(user?.token!);
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

// remove complaint
export const removeComplaint = createAsyncThunk(
  "complaints/removeComplaint",
  async (complaintData: IRemoveComplaintData, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await complaintService.removeComplaint(
        complaintData,
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

const complaintSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setSelectedComplaint(state, { payload }) {
      state.selectedComplaintId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComplaints.pending, (state) => {
        state.isGetAllComplaintsLoading = true;
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        state.isGetAllComplaintsLoading = false;
        state.isSuccess = true;
        state.complaints = action.payload!;
      })
      .addCase(getAllComplaints.rejected, (state, action) => {
        state.isGetAllComplaintsLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getComplaintsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComplaintsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userComplaints = action.payload!;
      })
      .addCase(getComplaintsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, setSelectedComplaint } = complaintSlice.actions;

export default complaintSlice.reducer;
