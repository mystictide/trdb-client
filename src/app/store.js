import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import validationReducer from "../features/auth/validationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    validation: validationReducer,
  },
});
