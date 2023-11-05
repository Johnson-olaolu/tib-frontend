"use client";
import { RootState } from "@/store/appSlice";
import { useRouter } from "next13-progressbar";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.replace(`/dashboard/home`);
    }
  }, [token]);
  return <> {children}</>;
};

export default AuthProvider;
