"use client";
import useToast from "@/context/toast";
import ideaService from "@/services/idea.service";
import { IIdea, IResponse } from "@/services/types";
import userService from "@/services/user.service";
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useMemo, useState } from "react";

interface IVaultCreateIdeaForSaleContext {
  activeStep: "Idea" | "Additional Information" | "Cost";
  setActiveStep: React.Dispatch<React.SetStateAction<"Idea" | "Additional Information" | "Cost">>;
  steps: readonly ["Idea", "Additional Information", "Cost"];
  formFields: IForSaleFields;
  setFormFields: React.Dispatch<React.SetStateAction<IForSaleFields>>;
  createIdeaForSaleMutation: UseMutationResult<IResponse<IIdea>, any, void, unknown>;
  isPending: boolean;
}

export interface IForSaleFields {
  title?: string;
  description?: string;
  categories?: string[];
  media?: File[];
  additionalAttachments?: File[];
  role?: string;
  collaborators?: string[];
  location?: string;
  website?: string;
  socialMediaLinks?: { name: string; url: string }[];
  competitors?: string[];
  ideaCost?: {
    currency: string;
    value: number;
  };
  sellingReason?: string;
}

export const VaultCreateIdeaForSaleContext = createContext({});

export const VaultCreateIdeaFundingNeededProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;
  const { openToast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const steps = ["Idea", "Additional Information", "Cost"] as const;
  const [activeStep, setActiveStep] = useState<(typeof steps)[number]>("Idea");

  const [formFields, setFormFields] = useState<IForSaleFields>({});

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });
  const createIdeaForSaleMutation = useMutation({
    mutationFn: async () => {
      const res = await ideaService.createIdeaForSale(user?.id || "", formFields);
      return res;
    },
    onSuccess: (data) => {
      openToast({
        title: "Idea Created Successfully",
        text: data.message,
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["idea"],
      });
      //Should change this to send to user profile page
      router.push(`/dashboard/vault/home`);
    },
    onError: (error: any) => {
      console.log(error);
      openToast({
        title: "Idea creation unsuccesfulll",
        text: error?.response?.data?.message,
        type: "failure",
      });
    },
  });

  const value = useMemo(
    () => ({
      activeStep,
      setActiveStep,
      steps,
      formFields,
      setFormFields,
      createIdeaForSaleMutation,
      isPending: createIdeaForSaleMutation.isPending,
    }),
    [activeStep, createIdeaForSaleMutation, formFields, steps]
  );
  return <VaultCreateIdeaForSaleContext.Provider value={value}>{children}</VaultCreateIdeaForSaleContext.Provider>;
};

const useVaultCreateForSaleIdea = (): IVaultCreateIdeaForSaleContext => useContext(VaultCreateIdeaForSaleContext) as IVaultCreateIdeaForSaleContext;

export default useVaultCreateForSaleIdea;
