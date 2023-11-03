"use client";
import { ToastContextProvider } from "@/context/toast";
import { store } from "@/store";
import React from "react";
import { PersistGate } from "redux-persist/es/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Provider as ReduxProvider } from "react-redux";
import { ModalContextProvider } from "@/context/modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider, persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Next13ProgressBar } from "next13-progressbar";

const persistor = persistStore(store);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 30, // 1 month
    },
  },
});

let localStoragePersister: any;
if (typeof window !== "undefined") {
  localStoragePersister = createSyncStoragePersister({ storage: window.localStorage });
  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
  });
}
export function Provider({ children }: { children: React.ReactNode }) {
  // const sessionStoragePersister = createSyncStoragePersister({ storage: window.sessionStorage })

  return (
    <>
      <PersistQueryClientProvider persistOptions={{ persister: localStoragePersister }} client={queryClient}>
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor}>
            <ModalContextProvider>
              <ToastContextProvider>
                {children}
                <Next13ProgressBar height="4px" color="#2299DD" options={{ showSpinner: true, easing: "ease" }} showOnShallow />
              </ToastContextProvider>
            </ModalContextProvider>
          </PersistGate>
        </ReduxProvider>
      </PersistQueryClientProvider>
    </>
  );
}
