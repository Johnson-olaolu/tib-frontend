"use client";
import { ToastContextProvider } from "@/context/toast";
import { store } from "@/store";
import React from "react";
import { PersistGate } from "redux-persist/es/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Provider as ReduxProvider } from "react-redux";

const persistor = persistStore(store);
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <ToastContextProvider>{children}</ToastContextProvider>
        </PersistGate>
      </ReduxProvider>
    </>
  );
}
