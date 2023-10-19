"use client";
import useModal from "@/context/modal";
import useToast from "@/context/toast";
import React from "react";

const ProviderWrapper = () => {
  const { getToast } = useToast();
  const { getModal } = useModal();

  //Fetch Site Wide Data
  return (
    <>
      {getToast()}
      {getModal()}
    </>
  );
};

export default ProviderWrapper;
