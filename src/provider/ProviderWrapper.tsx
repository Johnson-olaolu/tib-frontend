"use client";
import useToast from "@/context/toast";
import React from "react";

const ProviderWrapper = () => {
  const { getToast } = useToast();
  return <>{getToast()}</>;
};

export default ProviderWrapper;
