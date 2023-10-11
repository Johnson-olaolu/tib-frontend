import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line import/namespace
import { RootState } from "./appSlice";
import { IUser } from "@/services/types";

type UserState = {
  user: IUser | null;
};

const slice = createSlice({
  name: "user",
  initialState: { user: null, token: null } as UserState,
  reducers: {
    saveUser: (state, { payload: { user } }: PayloadAction<{ user: IUser }>) => {
      state.user = user;
    },
  },
});

export const { saveUser } = slice.actions;

export default slice.reducer;
