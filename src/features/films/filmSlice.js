import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filmService from "./filmService";

const initialState = {
  film: null,
  isError: false,
  isSuccess: false,
  detailsSuccess: false,
  castSuccess: false,
  crewSuccess: false,
  isLoading: false,
  isCastLoading: false,
  isCrewLoading: false,
  message: "",
};

export const GetFilm = createAsyncThunk(
  "film/get",
  async (reqData, thunkAPI) => {
    try {
      const response = await filmService.GetFilm(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
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

export const GetFilmCast = createAsyncThunk(
  "film/get/credits/cast",
  async (reqData, thunkAPI) => {
    try {
      const response = await filmService.GetFilmCast(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
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

export const GetFilmCrew = createAsyncThunk(
  "film/get/credits/crew",
  async (reqData, thunkAPI) => {
    try {
      const response = await filmService.GetFilmCrew(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
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

export const filmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    reset: (state) => {
      state.film = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.detailsSuccess = false;
      state.castSuccess = false;
      state.crewSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetFilm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.detailsSuccess = true;
        state.isError = false;
        state.film = action.payload;
      })
      .addCase(GetFilm.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.film = null;
      })
      .addCase(GetFilmCast.pending, (state) => {
        state.isCastLoading = true;
      })
      .addCase(GetFilmCast.fulfilled, (state, action) => {
        state.film.credits.cast = action.payload;
        state.castSuccess = true;
      })
      .addCase(GetFilmCast.rejected, (state, action) => {
        state.isCastLoading = false;
        state.castSuccess = false;
        state.film.credits.cast = null;
      })
      .addCase(GetFilmCrew.pending, (state) => {
        state.isCrewLoading = true;
      })
      .addCase(GetFilmCrew.fulfilled, (state, action) => {
        state.film.credits.crew = action.payload;
        state.crewSuccess = true;
      })
      .addCase(GetFilmCrew.rejected, (state, action) => {
        state.isCrewLoading = false;
        state.crewSuccess = false;
        state.film.credits.crew = null;
      });
  },
});

export const { reset } = filmSlice.actions;
export default filmSlice.reducer;
