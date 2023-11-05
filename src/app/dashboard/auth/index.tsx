"use client";
import { RootState } from "@/store/appSlice";
import { useRouter } from "next13-progressbar";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const DashboardAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  useEffect(() => {
    console.log({ token });

    if (!token) {
      router.replace(`/auth/login`);
    }
  }, [token]);
  return <>{children}</>;
};

export default DashboardAuthProvider;
