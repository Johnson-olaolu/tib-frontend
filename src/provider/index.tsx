"use client";
import { ToastContextProvider } from "@/context/toast";
import React from "react";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContextProvider>{children}</ToastContextProvider>
    </>
  );
}
