import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IComplaintData, IComplaintsInitialState } from "../../models";
import complaintService from "../../services/complaint-service";
import { RootState } from "../store";

const initialState: IComplaintsInitialState = {
  complaints: [],
  isError: false,
  isSuccess: false,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComplaints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.complaints = action.payload!;
      })
      .addCase(getAllComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = complaintSlice.actions;

export default complaintSlice.reducer;
