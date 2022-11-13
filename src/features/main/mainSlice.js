import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mainService from "./mainService";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const weekly = cookies.get("weekly");
const popular = cookies.get("popular");
const top = cookies.get("top");

const initialState = {
  homepage: {
    weekly: weekly ? weekly : null,
    popular: popular ? popular : null,
    top: top ? top : null,
  },
  browse: null,
  search: {
    movies: null,
    actors: null,
    directors: null,
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

export const GetPopularMovies = createAsyncThunk(
  "main/get/popular",
  async (thunkAPI) => {
    try {
      const response = await mainService.GetPopularMovies();
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

export const GetTopMovies = createAsyncThunk(
  "main/get/top",
  async (thunkAPI) => {
    try {
      const response = await mainService.GetTopMovies();
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

export const Browse = createAsyncThunk(
  "main/browse",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.Browse(reqData);
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

export const SearchMovies = createAsyncThunk(
  "main/search/movie",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.SearchMovies(reqData);
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

export const SearchActors = createAsyncThunk(
  "main/search/actor",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.SearchActors(reqData);
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

export const SearchDirectors = createAsyncThunk(
  "main/search/director",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.SearchDirectors(reqData);
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
    clearSearch: (state) => {
      state.search.movies = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    clearBrowser: (state) => {
      state.browse = null;
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
        state.isError = false;
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
        state.isError = false;
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
        state.isError = false;
        state.homepage.top = action.payload;
      })
      .addCase(GetTopMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.homepage.top = null;
      })
      .addCase(Browse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Browse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.browse = action.payload;
      })
      .addCase(Browse.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.browse = null;
      })
      .addCase(SearchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SearchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.search.movies = action.payload;
      })
      .addCase(SearchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.search.movies = null;
      })
      .addCase(SearchActors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SearchActors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.search.actors = action.payload;
      })
      .addCase(SearchActors.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.search.actors = null;
      })
      .addCase(SearchDirectors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SearchDirectors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.search.directors = action.payload;
      })
      .addCase(SearchDirectors.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.search.directors = null;
      });
  },
});

export const { reset, clearSearch, clearBrowser } = mainSlice.actions;
export default mainSlice.reducer;
