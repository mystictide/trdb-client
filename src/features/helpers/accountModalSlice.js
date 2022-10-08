import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginActive: false,
  registerActive: false,
};

export const accountModalSlice = createSlice({
  name: "accountModal",
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loginActive = false;
    },
    resetRegisterState: (state) => {
      state.registerActive = false;
    },
    updateLoginState(state) {
      state.loginActive = !state.loginActive;
    },
    updateRegisterState(state) {
      state.registerActive = !state.registerActive;
    },
  },
});

export const {
  resetLoginState,
  resetRegisterState,
  updateLoginState,
  updateRegisterState,
} = accountModalSlice.actions;
export default accountModalSlice.reducer;
