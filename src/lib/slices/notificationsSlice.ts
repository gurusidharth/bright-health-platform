import { createSlice } from "@reduxjs/toolkit";
import { notifications as seedNotifications, type Notification } from "@/lib/data/notifications";

type NotificationsState = {
  items: Notification[];
};

const initialState: NotificationsState = {
  items: seedNotifications,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAllRead(state) {
      state.items.forEach((n) => (n.read = true));
    },
    markRead(state, action: { payload: string }) {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) item.read = true;
    },
  },
});

export const { markAllRead, markRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
