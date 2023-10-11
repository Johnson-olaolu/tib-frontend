import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line import/namespace
import { RootState } from "./appSlice";
import { IUser } from "@/services/types";

type AuthState = {
  token: string | null;
  user: IUser | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { token, user } }: PayloadAction<{ token: string; user: IUser }>) => {
      state.token = token;
      state.user = user;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
