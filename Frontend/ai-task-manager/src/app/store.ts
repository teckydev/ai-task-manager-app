import { configureStore } from "@reduxjs/toolkit";

// reducers
import authReducer from "../features/authSlice";
import taskReducer from "../features/taskSlice";
// import aiReducer from "../features/ai/aiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    // ai: aiReducer,
  },
});

// 🔹 Types for entire app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
