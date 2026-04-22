import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPaymentData, IPaymentInitialState } from "../../models";
import paymentService from "../../services/payment-service";

const initialState: IPaymentInitialState = {
  payments: [],
  userPayments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isGetAllPaymentsLoading: false,
  isGetPaymentsByUserLoading: false,
  message: "",
};

// create payment
export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (paymentData: IPaymentData, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await paymentService.createPayment(paymentData, user?.token!);
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

// get all payments
export const getAllPayments = createAsyncThunk(
  "payments/getAllPayments",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await paymentService.getAllPayments(user?.token!);
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

// user specific payments
export const getPaymentsByUser = createAsyncThunk(
  "payments/getPaymentsByUser",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await paymentService.getPaymentByUser(user?.token!);
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

const paymentSlice = createSlice({
  name: "paymants",
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
      .addCase(getAllPayments.pending, (state) => {
        state.isGetAllPaymentsLoading = true;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.isGetAllPaymentsLoading = false;
        state.isSuccess = true;
        state.payments = action.payload!;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.isGetAllPaymentsLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getPaymentsByUser.pending, (state) => {
        state.isGetPaymentsByUserLoading = true;
      })
      .addCase(getPaymentsByUser.fulfilled, (state, action) => {
        state.isGetPaymentsByUserLoading = false;
        state.isSuccess = true;
        state.userPayments = action.payload!;
      })
      .addCase(getPaymentsByUser.rejected, (state, action) => {
        state.isGetPaymentsByUserLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = paymentSlice.actions;

export default paymentSlice.reducer;
