import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const personal = JSON.parse(localStorage.getItem("personal"));
const following = JSON.parse(localStorage.getItem("following"));
const followers = JSON.parse(localStorage.getItem("followers"));

const initialState = {
  profile: {
    personal: personal ? personal : null,
    following: following ? following : null,
    followers: followers ? followers : null,
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
      return await userService.GetUserProfile(reqData);
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
      return await userService.GetUserFollowing(reqData);
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
      return await userService.GetUserFollowers(reqData);
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
      return await userService.GetUserBlocklist(reqData);
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
        state.profile.personal = action.payload;
      })
      .addCase(GetUserProfile.rejected, (state, action) => {
        state.isLoading = false;
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
        state.profile.following = action.payload;
      })
      .addCase(GetUserFollowing.rejected, (state, action) => {
        state.isLoading = false;
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
        state.profile.followers = action.payload;
      })
      .addCase(GetUserFollowers.rejected, (state, action) => {
        state.isLoading = false;
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
        // state.profile.followers = action.payload;
      })
      .addCase(GetUserBlocklist.rejected, (state, action) => {
        // state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
        // state.profile.followers = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
