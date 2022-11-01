import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mainService from "./mainService";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const weekly = JSON.parse(localStorage.getItem("weekly"));
const popular = cookies.get("popular");
const top = cookies.get("top");

const initialState = {
  homepage: {
    weekly: weekly ? weekly : null,
    popular: popular ? popular : null,
    top: top ? top : null,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const GetWeekly = createAsyncThunk(
  "main/get/weekly",
  async (thunkAPI) => {
    try {
      const response = await mainService.GetWeekly();
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
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

export const GetPopularMovies = createAsyncThunk(
  "main/get/popular",
  async (thunkAPI) => {
    try {
      const response = await mainService.GetPopularMovies();
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
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

export const GetTopMovies = createAsyncThunk(
  "main/get/top",
  async (thunkAPI) => {
    try {
      const response =  await mainService.GetTopMovies();
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
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
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.homepage.weekly = null;
      })
      .addCase(GetPopularMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.homepage.popular = action.payload;
      })
      .addCase(GetPopularMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.homepage.popular = null;
      })
      .addCase(GetTopMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetTopMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.homepage.top = action.payload;
      })
      .addCase(GetTopMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.homepage.top = null;
      });
  },
});

export const { reset } = mainSlice.actions;
export default mainSlice.reducer;
