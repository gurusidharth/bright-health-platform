import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/lib/slices/uiSlice";
import chatReducer from "@/lib/slices/chatSlice";
import notificationsReducer from "@/lib/slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
