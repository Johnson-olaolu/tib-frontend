import { AnyAction, combineReducers, createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

const appSlice = createSlice({
  name: "app",
  initialState: {
    v1: {},
  } as {
    v1: object;
  },
  reducers: {
    clearStore() {},
  },
});

export const { clearStore } = appSlice.actions;

const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice,
  user: userSlice,
});

export const combinedMiddleware = [];

export const rootReducer: Reducer = (state: ReturnType<typeof reducers>, action: AnyAction) => {
  if (action.type === "app/clearStore") {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem("persist:root");
    // eslint-disable-next-line no-param-reassign
    state = {} as ReturnType<typeof reducers>;
  }
  return reducers(state, action);
};

export type RootState = ReturnType<typeof reducers>;
