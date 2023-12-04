"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

interface IVaultCreateIdeaFundingNeededContext {
  activeStep: "Idea" | "Additional Information" | "Cost";
  setActiveStep: React.Dispatch<React.SetStateAction<"Idea" | "Additional Information" | "Cost">>;
  steps: readonly ["Idea", "Additional Information", "Cost"];
  formFields: IFundingNeededFields;
  setFormFields: React.Dispatch<React.SetStateAction<IFundingNeededFields>>;
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
  costOfExecution?: {
    currency: string;
    value: number;
  };
  estimatedRoiTimeline?: string;
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
  const steps = ["Idea", "Additional Information", "Cost"] as const;
  const [activeStep, setActiveStep] = useState<(typeof steps)[number]>("Idea");

  const [formFields, setFormFields] = useState<IFundingNeededFields>({});

  const value = useMemo(
    () => ({
      activeStep,
      setActiveStep,
      steps,
      formFields,
      setFormFields,
    }),
    [activeStep, formFields, steps]
  );
  return <VaultCreateIdeaFundingNeededContext.Provider value={value}>{children}</VaultCreateIdeaFundingNeededContext.Provider>;
};

const useVaultCreateIdeaDepositIdea = (): IVaultCreateIdeaFundingNeededContext =>
  useContext(VaultCreateIdeaFundingNeededContext) as IVaultCreateIdeaFundingNeededContext;

export default useVaultCreateIdeaDepositIdea;
