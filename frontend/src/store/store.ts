import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import homeReducer from "./features/homeSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    homes: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;