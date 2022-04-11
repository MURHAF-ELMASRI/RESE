import { configureStore } from "@reduxjs/toolkit";
import pitchReducer from "./Pitch/pitchSlice";
import uiReducer from "./ui/uiSlice";
import userReducer from "./User/UserSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    pitch: pitchReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
