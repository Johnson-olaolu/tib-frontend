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
  title: string;
  description: string;
  category: never[];
  media: never[];
  role: string;
  collaborators: never[];
  location: string;
  website: string;
  socialMediaLinks: never[];
  competitors: never[];
  valuation: null;
  costOfExecution: null;
  estimatedRoiTimeline: string;
  projectedRevenue: null;
  fundingStage: string;
  totalMoneyRaised: string;
}

export const VaultCreateIdeaFundingNeededContext = createContext({});

export const VaultCreateIdeaFundingNeededProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;
  const steps = ["Idea", "Additional Information", "Cost"] as const;
  const [activeStep, setActiveStep] = useState<(typeof steps)[number]>("Idea");

  const [formFields, setFormFields] = useState<IFundingNeededFields>({
    title: "",
    description: "",
    category: [],
    media: [],
    role: "",
    collaborators: [],
    location: "",
    website: "",
    socialMediaLinks: [],
    competitors: [],
    valuation: null,
    costOfExecution: null,
    estimatedRoiTimeline: "",
    projectedRevenue: null,
    fundingStage: "",
    totalMoneyRaised: "",
  });

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
