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
      return await settingsService.UpdatePersonal(reqData);
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
      return await settingsService.UpdateAvatar(reqData);
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
      return await settingsService.ToggleDMs(reqData);
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
      return await settingsService.TogglePrivacy(reqData);
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
      return await settingsService.ToggleAdultContent(reqData);
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
      state.isLoading = false;
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
      })
      .addCase(UpdatePersonal.rejected, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(UpdateAvatar.rejected, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(ToggleDMs.rejected, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(TogglePrivacy.rejected, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(ToggleAdultContent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = settingsSlice.actions;
export default settingsSlice.reducer;
