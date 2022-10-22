import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mainService from "./mainService";

const weekly = JSON.parse(localStorage.getItem("weekly"));

const initialState = {
  homepage: {
    weekly: weekly ? weekly : null,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedOut: false,
  message: "",
};

export const GetWeekly = createAsyncThunk(
  "main/get/weekly",
  async (thunkAPI) => {
    try {
      return await mainService.GetWeekly();
    } catch (error) {
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

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLoggedOut = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetWeekly.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetWeekly.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.homepage.weekly = action.payload;
      })
      .addCase(GetWeekly.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.homepage.weekly = null;
      });
  },
});

export const { reset } = mainSlice.actions;
export default mainSlice.reducer;
