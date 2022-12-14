import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  profile: {
    personal: null,
    following: null,
    followers: null,
    favorites: null,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const GetUserProfile = createAsyncThunk(
  "users/get/profile",
  async (reqData, thunkAPI) => {
    try {
      const response = await userService.GetUserProfile(reqData);
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

export const GetUserFollowing = createAsyncThunk(
  "users/get/following",
  async (reqData, thunkAPI) => {
    try {
      const response = await userService.GetUserFollowing(reqData);
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

export const GetUserFollowers = createAsyncThunk(
  "users/get/followers",
  async (reqData, thunkAPI) => {
    try {
      const response = await userService.GetUserFollowers(reqData);
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

export const GetUserBlocklist = createAsyncThunk(
  "users/get/blocklist",
  async (reqData, thunkAPI) => {
    try {
      const response = await userService.GetUserBlocklist(reqData);
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

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.profile.personal = null;
      state.profile.following = null;
      state.profile.followers = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.profile.personal = action.payload;
      })
      .addCase(GetUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.profile.personal = null;
      })
      .addCase(GetUserFollowing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.profile.following = action.payload;
      })
      .addCase(GetUserFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.profile.following = null;
      })
      .addCase(GetUserFollowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.profile.followers = action.payload;
      })
      .addCase(GetUserFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.profile.followers = null;
      })
      .addCase(GetUserBlocklist.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(GetUserBlocklist.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.isSuccess = true;
        // state.isError = false;
        // state.profile.followers = action.payload;
      })
      .addCase(GetUserBlocklist.rejected, (state, action) => {
        // state.isLoading = false;
        // state.isSuccess = false;
        // state.isError = true;
        // state.message = action.payload;
        // state.profile.followers = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
