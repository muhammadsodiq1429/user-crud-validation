import { configureStore } from "@reduxjs/toolkit";
import userUpdateSlice from "./features/user-update-slice";

export const store = configureStore({
  reducer: {
    userUpdateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
