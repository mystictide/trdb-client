import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import validationService from "./validationService";

const initialState = {
  usernameValidated: false,
  emailValidated: false,
};

export const checkExistingUsername = createAsyncThunk(
  "validation/cusername",
  async (username, thunkAPI) => {
    try {
      return await validationService.checkExistingUsername(username);
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

export const checkExistingMail = createAsyncThunk(
  "validation/cmail",
  async (email, thunkAPI) => {
    try {
      return await validationService.checkExistingMail(email);
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

export const validationSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    reset: (state) => {
      state.usernameValidated = false;
      state.emailValidated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkExistingUsername.fulfilled, (state, action) => {
        state.usernameValidated = action.payload;
      })
      .addCase(checkExistingMail.fulfilled, (state, action) => {
        state.emailValidated = action.payload;
      });
  },
});

export const { reset } = validationSlice.actions;
export default validationSlice.reducer;
