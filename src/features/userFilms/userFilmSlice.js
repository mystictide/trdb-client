import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userFilmService from "./userFilmService";

const initialState = {
  userfilm: {
    watched: false,
    liked: false,
    watchlist: false,
    rating: null,
    reviews: [],
  },
  userfilmlog: {
    film: null,
    review: null,
  },
  userfilmlogs: {
    film: null,
    reviews: null,
  },
  isError: false,
  isSuccess: false,
  isInitialSuccess: false,
  isReviewSuccess: false,
  isLoading: false,
  message: "",
};

export const GetUserFilmLogs = createAsyncThunk(
  "film/get/user/logs",
  async (reqData, thunkAPI) => {
    try {
      const response = await userFilmService.GetUserFilmLogs(reqData);
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

export const GetUserFilmReview = createAsyncThunk(
  "film/get/user/review",
  async (reqData, thunkAPI) => {
    try {
      const response = await userFilmService.GetUserFilmReview(reqData);
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

export const GetUserFilmDetails = createAsyncThunk(
  "film/get/user",
  async (reqData, thunkAPI) => {
    try {
      const response = await userFilmService.GetUserFilmDetails(reqData);
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

export const Watch = createAsyncThunk(
  "film/watch",
  async (reqData, thunkAPI) => {
    try {
      const response = await userFilmService.Watch(reqData);
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

export const Like = createAsyncThunk("film/like", async (reqData, thunkAPI) => {
  try {
    const response = await userFilmService.Like(reqData);
    if (response.status === 500) {
      return thunkAPI.rejectWithValue(response);
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const Watchlist = createAsyncThunk(
  "film/watchlist",
  async (reqData, thunkAPI) => {
    try {
      const response = await userFilmService.Watchlist(reqData);
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

export const Rate = createAsyncThunk("film/rate", async (reqData, thunkAPI) => {
  try {
    const response = await userFilmService.Rate(reqData);
    if (response.status === 500) {
      return thunkAPI.rejectWithValue(response);
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const Review = createAsyncThunk(
  "film/review",
  async (reqData, thunkAPI) => {
    try {
      const response = await userFilmService.Review(reqData);
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

export const userFilmSlice = createSlice({
  name: "userFilm",
  initialState,
  reducers: {
    resetUserFilm: (state) => {
      state.userfilm = {
        watched: false,
        liked: false,
        watchlist: false,
        rating: null,
        reviews: [],
      };
      state.userfilmlog = {
        film: null,
        review: null,
      };
      state.userfilmlogs= {
        film: null,
        reviews: null,
      }
      state.isLoading = false;
      state.isSuccess = false;
      state.isInitialSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetReviewState: (state) => {
      state.isReviewSuccess = false;
    },
    resetUserFilmLog: (state) => {
      state.isSuccess = false;
      state.userfilmlog = {
        film: null,
        review: null,
      };
    },
    resetUserFilmLogs: (state) => {
      state.isSuccess = false;
      state.userfilmlogs = {
        film: null,
        reviews: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserFilmLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserFilmLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userfilmlogs = action.payload;
      })
      .addCase(GetUserFilmLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userfilmlogs = null;
      })
      .addCase(GetUserFilmReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserFilmReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userfilmlog = action.payload;
      })
      .addCase(GetUserFilmReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userfilmlog = null;
      })
      .addCase(GetUserFilmDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserFilmDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialSuccess = true;
        state.isError = false;
        state.userfilm = action.payload;
      })
      .addCase(GetUserFilmDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userfilm = null;
      })
      .addCase(Watch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Watch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userfilm.watched = action.payload;
      })
      .addCase(Watch.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userfilm.watched = false;
      })
      .addCase(Like.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Like.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userfilm.liked = action.payload;
      })
      .addCase(Like.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userfilm.liked = false;
      })
      .addCase(Watchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Watchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userfilm.watchlist = action.payload;
      })
      .addCase(Watchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userfilm.watchlist = false;
      })
      .addCase(Rate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Rate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userfilm.rating = action.payload;
      })
      .addCase(Rate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userfilm.rating = null;
      })
      .addCase(Review.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Review.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReviewSuccess = true;
        state.isError = false;
        state.userfilm.reviews.push(action.payload);
        state.userfilm.liked = state.userfilm.reviews[0].liked;
      })
      .addCase(Review.rejected, (state, action) => {
        state.isLoading = false;
        state.isReviewSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.userfilm.reviews = null;
      });
  },
});

export const { resetUserFilm, resetReviewState, resetUserFilmLog, resetUserFilmLogs } = userFilmSlice.actions;
export default userFilmSlice.reducer;
