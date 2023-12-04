"use client";
import useToast from "@/context/toast";
import ideaService from "@/services/idea.service";
import { IIdea, IResponse } from "@/services/types";
import userService from "@/services/user.service";
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface IVaultCreateIdeaFundingNeededContext {
  activeStep: "Idea" | "Additional Information" | "Cost";
  setActiveStep: React.Dispatch<React.SetStateAction<"Idea" | "Additional Information" | "Cost">>;
  steps: readonly ["Idea", "Additional Information", "Cost"];
  formFields: IFundingNeededFields;
  setFormFields: React.Dispatch<React.SetStateAction<IFundingNeededFields>>;
  createIdeaFundingNeededMutation: UseMutationResult<IResponse<IIdea>, any, void, unknown>;
  isPending: boolean;
  saveForLater: () => void;
}

export interface IFundingNeededFields {
  title?: string;
  description?: string;
  categories?: string[];
  media?: File[];
  role?: string;
  collaborators?: string[];
  location?: string;
  website?: string;
  socialMediaLinks?: { name: string; url: string }[];
  competitors?: string[];
  valuation?: {
    currency: string;
    value: number;
  };
  executionCost?: {
    currency: string;
    value: number;
  };
  ROITimeline?: string;
  projectedRevenue?: {
    currency: string;
    value: number;
  };
  fundingStage?: string;
  totalMoneyRaised?: {
    currency: string;
    value: number;
  };
}

export const VaultCreateIdeaFundingNeededContext = createContext({});

export const VaultCreateIdeaFundingNeededProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;
  const { openToast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const steps = ["Idea", "Additional Information", "Cost"] as const;
  const [activeStep, setActiveStep] = useState<(typeof steps)[number]>("Idea");

  const [formFields, setFormFields] = useState<IFundingNeededFields>({});

  const saveForLater = () => {
    localStorage.setItem(
      "savedIdeaFundingNeeded",
      JSON.stringify({
        step: activeStep,
        fields: formFields,
      })
    );
    openToast({
      type: "info",
      text: "Idea Saved for later",
    });
    router.push(`/dashboard/vault/home`);
  };

  useEffect(() => {
    const savedData: {
      step: "Idea" | "Additional Information" | "Cost";
      fields: IFundingNeededFields;
    } = JSON.parse(localStorage.getItem("savedIdeaFundingNeeded") || "0");
    if (savedData) {
      setFormFields({ ...savedData.fields });
      setActiveStep(savedData.step);
      localStorage.removeItem("savedIdeaFundingNeeded");
    }
  }, []);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });
  const createIdeaFundingNeededMutation = useMutation({
    mutationFn: async () => {
      const res = await ideaService.createIdeaFundingNeeded(user?.id || "", formFields);
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
      createIdeaFundingNeededMutation,
      isPending: createIdeaFundingNeededMutation.isPending,
      saveForLater,
    }),
    [activeStep, createIdeaFundingNeededMutation, formFields, steps]
  );
  return <VaultCreateIdeaFundingNeededContext.Provider value={value}>{children}</VaultCreateIdeaFundingNeededContext.Provider>;
};

const useVaultCreateFundingNeededIdea = (): IVaultCreateIdeaFundingNeededContext =>
  useContext(VaultCreateIdeaFundingNeededContext) as IVaultCreateIdeaFundingNeededContext;

export default useVaultCreateFundingNeededIdea;
