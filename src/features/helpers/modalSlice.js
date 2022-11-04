import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginActive: false,
  registerActive: false,
  searchActive: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.loginActive = false;
    },
    resetRegisterState: (state) => {
      state.registerActive = false;
    },
    resetSearchState: (state) => {
      state.searchActive = false;
    },
    updateLoginState(state) {
      state.loginActive = !state.loginActive;
    },
    updateRegisterState(state) {
      state.registerActive = !state.registerActive;
    },
    updateSearchState(state) {
      state.searchActive = !state.searchActive;
    },
  },
});

export const {
  resetLoginState,
  resetRegisterState,
  updateLoginState,
  updateRegisterState,
  resetSearchState,
  updateSearchState,
} = modalSlice.actions;
export default modalSlice.reducer;
