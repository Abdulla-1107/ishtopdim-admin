import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/auth.slice";
// import savedSlice from "@/features/saved/store/saved.slice";

export const store = configureStore({
  reducer: {
    fake: () => null,
    auth: authReducer,
    // saved: savedSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
