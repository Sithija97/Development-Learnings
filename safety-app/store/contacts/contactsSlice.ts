import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IContactPersonData, IContactsInitialState } from "../../models";
import { RootState } from "../store";
import contactsService from "../../services/contacts-service";

const initialState: IContactsInitialState = {
  contacts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create contacts
export const createContactList = createAsyncThunk(
  "contacts/createContactList",
  async (
    contactData: { userContactPersonData: IContactPersonData[] },
    thunkAPI
  ) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await contactsService.createContacts(contactData, user?.token!);
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

// get contacts
export const getContactList = createAsyncThunk(
  "contacts/getContactList",
  async (_, thunkAPI) => {
    const user = (thunkAPI.getState() as RootState).auth.user;
    try {
      return await contactsService.getContacts(user?.token!);
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

const contactsSlice = createSlice({
  name: "contacts",
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
      .addCase(getContactList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload!;
      })
      .addCase(getContactList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = contactsSlice.actions;

export default contactsSlice.reducer;
