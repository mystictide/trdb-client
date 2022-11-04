import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import settingsReducer from "../features/users/settings/settingsSlice";
import mainReducer from "../features/main/mainSlice";
import validationReducer from "../features/auth/validationSlice";
import modalReducer from "../features/helpers/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    settings: settingsReducer,
    main: mainReducer,
    validation: validationReducer,
    modals: modalReducer,
  },
});
