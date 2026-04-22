import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/authSlice";
import complaintsReducer from "./complaints/complaintsSlice";
import fineReducer from "./fines/fineSlice";
import reportsReducer from "./reports/reportSlice";
import paymentReducer from "./payments/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    complaints: complaintsReducer,
    fines: fineReducer,
    policeReports: reportsReducer,
    payments: paymentReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
