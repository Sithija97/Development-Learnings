import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/authSlice";
import complaintReducer from "./complaints/complaintsSlice";
import emergencyReducer from "./emergency/emergencySlice";
import communityReducer from "./community/communitySlice";
import contactsReducer from "./contacts/contactsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    complaints: complaintReducer,
    emergencies: emergencyReducer,
    community: communityReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
