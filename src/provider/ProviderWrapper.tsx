"use client";
import useModal from "@/context/modal";
import useToast from "@/context/toast";
import React from "react";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userService from "@/services/user.service";
import interestService from "@/services/interest.service";
import walletService from "@/services/wallet.service";

const ProviderWrapper = () => {
  const { getToast } = useToast();
  const { getModal } = useModal();

  //Fetch Site Wide Data
  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  useQuery({
    queryKey: ["interest"],
    queryFn: async () => {
      const res = await interestService.getInterests();
      return res.data;
    },
  });

  useQuery({
    queryKey: ["paymentMethod"],
    queryFn: async () => {
      const res = await walletService.getPaymentMethods();
      return res.data;
    },
  });
  return (
    <>
      {getToast()}
      {getModal()}
    </>
  );
};

export default ProviderWrapper;
