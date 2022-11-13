import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginActive: false,
  registerActive: false,
  filmSearchActive: false,
  actorSearchActive: false,
  directorSearchActive: false,
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
      state.filmSearchActive = false;
      state.actorSearchActive = false;
      state.directorSearchActive = false;
    },
    updateLoginState(state) {
      state.loginActive = !state.loginActive;
    },
    updateRegisterState(state) {
      state.registerActive = !state.registerActive;
    },
    updateFilmSearchState(state) {
      state.filmSearchActive = !state.filmSearchActive;
    },
    updateActorSearchState(state) {
      state.actorSearchActive = !state.actorSearchActive;
    },
    updateDirectorSearchState(state) {
      state.directorSearchActive = !state.directorSearchActive;
    },
  },
});

export const {
  resetLoginState,
  resetRegisterState,
  updateLoginState,
  updateRegisterState,
  resetSearchState,
  updateFilmSearchState,
  updateActorSearchState,
  updateDirectorSearchState,
} = modalSlice.actions;
export default modalSlice.reducer;
