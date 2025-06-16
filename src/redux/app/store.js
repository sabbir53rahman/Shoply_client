import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice/apiSlice";
import { userReducer } from "../features/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
