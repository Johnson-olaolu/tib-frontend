import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { INotification, IUser } from "@/services/types";

type NotificationState = {
  notifications: INotification<any>[] | null;
};

const slice = createSlice({
  name: "notification",
  initialState: { notifications: null } as NotificationState,
  reducers: {
    saveNotification: (state, { payload: { notifications } }: PayloadAction<{ notifications: INotification<any>[] }>) => {
      state.notifications = notifications;
    },
  },
});

export const { saveNotification } = slice.actions;

export default slice.reducer;
