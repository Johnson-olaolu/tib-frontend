import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IInterest, IUser } from "@/services/types";

type InterestState = {
  interests: IInterest[];
};

const authSlice = createSlice({
  name: "interest",
  initialState: { interests: [] } as InterestState,
  reducers: {
    setInterests: (state, { payload: { interests } }: PayloadAction<{ interests: IInterest[] }>) => {
      state.interests = interests;
    },
  },
});

export const { setInterests: setCredentials } = authSlice.actions;

export default authSlice.reducer;
