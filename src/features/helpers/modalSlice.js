import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginActive: false,
  registerActive: false,
  filmSearchActive: false,
  actorSearchActive: false,
  directorSearchActive: false,
  photoActive: false,
  reviewState: false,
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
    resetReviewState: (state) => {
      state.reviewState = false;
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
    updatePhotoState(state) {
      state.photoActive = !state.photoActive;
    },
    updateReviewState(state) {
      state.reviewState = !state.reviewState;
    },
  },
});

export const {
  resetLoginState,
  resetRegisterState,
  updateLoginState,
  updateRegisterState,
  resetSearchState,
  resetReviewState,
  updateFilmSearchState,
  updateActorSearchState,
  updateDirectorSearchState,
  updatePhotoState,
  updateReviewState,
} = modalSlice.actions;
export default modalSlice.reducer;
