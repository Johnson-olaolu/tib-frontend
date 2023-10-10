"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { IToastContext, IToastData, IToastPayload } from "./types";
import Toast from "../../components/toast";

const ToastContext = createContext({});

export const ToastContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [toastData, setToastData] = useState<IToastData[]>([]);

  const openToast = (data: IToastPayload) => {
    const uuid = crypto.randomUUID();
    setToastData((toastData) => {
      return [...toastData, { ...data, id: uuid }];
    });
  };

  const closeToast = (id: string) => {
    setToastData((data) => {
      return data.filter((d) => d.id !== id);
    });
  };
  const getToast = () => {
    return <Toast closeToast={closeToast} data={toastData} />;
  };

  const value = useMemo(
    () => ({
      getToast,
      openToast,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openToast]
  );
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

const useToast = (): IToastContext => useContext(ToastContext) as IToastContext;

export default useToast;
