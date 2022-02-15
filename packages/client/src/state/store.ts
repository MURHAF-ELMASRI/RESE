import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/UserSlice";
import pitchReducer from "./Pitch/pitchSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    pitch: pitchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
