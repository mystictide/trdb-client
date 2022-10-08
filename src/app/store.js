import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import validationReducer from "../features/auth/validationSlice";
import accountModalReducer from "../features/helpers/accountModalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    validation: validationReducer,
    accountModal: accountModalReducer,
  },
});
