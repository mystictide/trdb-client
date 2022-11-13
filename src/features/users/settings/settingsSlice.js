import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import settingsService from "./settingsService";

const initialState = {
  isError: false,
  isSuccess: false,
  message: "",
};

export const UpdatePersonal = createAsyncThunk(
  "settings/personal",
  async (reqData, thunkAPI) => {
    try {
      const response = await settingsService.UpdatePersonal(reqData);
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

export const UpdateAvatar = createAsyncThunk(
  "settings/avatar",
  async (reqData, thunkAPI) => {
    try {
      const response = await settingsService.UpdateAvatar(reqData);
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

export const ToggleDMs = createAsyncThunk(
  "settings/dm",
  async (reqData, thunkAPI) => {
    try {
      const response = await settingsService.ToggleDMs(reqData);
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

export const ToggleWatchlist = createAsyncThunk(
  "settings/watchlist",
  async (reqData, thunkAPI) => {
    try {
      const response = await settingsService.ToggleWatchlist(reqData);
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

export const TogglePrivacy = createAsyncThunk(
  "settings/privacy",
  async (reqData, thunkAPI) => {
    try {
      const response = await settingsService.TogglePrivacy(reqData);
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

export const ToggleAdultContent = createAsyncThunk(
  "settings/adult",
  async (reqData, thunkAPI) => {
    try {
      const response = await settingsService.ToggleAdultContent(reqData);
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

export const ManageFavoriteMovies = createAsyncThunk(
  "settings/favorites/movies",
  async (reqData, thunkAPI) => {
    try {
      const response = await settingsService.ManageFavoriteMovies(reqData);
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

export const ManageFavoriteActors = createAsyncThunk(
  "settings/favorites/actors",
  async (reqData, thunkAPI) => {
    try {
      const response = await settingsService.ManageFavoriteActors(reqData);
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

export const ManageFavoriteDirectors = createAsyncThunk(
  "settings/favorites/directors",
  async (reqData, thunkAPI) => {
    try {
      const response = await settingsService.ManageFavoriteDirectors(reqData);
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

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdatePersonal.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(UpdatePersonal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(UpdatePersonal.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(UpdateAvatar.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(UpdateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(UpdateAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ManageFavoriteMovies.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(ManageFavoriteMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(ManageFavoriteMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ManageFavoriteActors.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(ManageFavoriteActors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(ManageFavoriteActors.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ManageFavoriteDirectors.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(ManageFavoriteDirectors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(ManageFavoriteDirectors.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ToggleDMs.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(ToggleDMs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(ToggleDMs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ToggleWatchlist.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(ToggleWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(ToggleWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(TogglePrivacy.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(TogglePrivacy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(TogglePrivacy.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ToggleAdultContent.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(ToggleAdultContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(ToggleAdultContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = settingsSlice.actions;
export default settingsSlice.reducer;
