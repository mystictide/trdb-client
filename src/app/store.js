import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import mainReducer from "../features/main/mainSlice";
import validationReducer from "../features/auth/validationSlice";
import accountModalReducer from "../features/helpers/accountModalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    validation: validationReducer,
    accountModal: accountModalReducer,
  },
});
