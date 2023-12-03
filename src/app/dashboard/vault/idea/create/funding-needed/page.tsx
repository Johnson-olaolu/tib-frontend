"use client";
import BackButton from "@/components/extras/BackButton";
import React from "react";
import PageTracker from "@/components/extras/PageTracker";
import useVaultCreateIdeaDepositIdea from "./context";
import VaultCreateIdeaFundingNeededFormPage1 from "./components/form/page1";
import VaultCreateIdeaFundingNeededFormPage2 from "./components/form/page2";
import VaultCreateIdeaFundingNeededFormPage3 from "./components/form/page3";

const VaultCreateIdeaDepositIdeaPage = () => {
  const { steps, activeStep } = useVaultCreateIdeaDepositIdea();
  return (
    <main className="">
      <BackButton />
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className=" font-bold text-3xl text-tib-purple">Deposit your Idea</h1>
          <p className="text-xl">You are just a few steps away from greatness</p>
        </div>
        <div className=" flex justify-center mt-14">
          <PageTracker steps={steps} activeStep={activeStep} />
        </div>
        <div className=" mt-12">
          {activeStep === "Idea" ? (
            <VaultCreateIdeaFundingNeededFormPage1 />
          ) : activeStep === "Additional Information" ? (
            <VaultCreateIdeaFundingNeededFormPage2 />
          ) : activeStep === "Cost" ? (
            <VaultCreateIdeaFundingNeededFormPage3 />
          ) : null}
        </div>
        <div className=" flex  justify-center mt-12">
          <button className=" text-tib-blue font-bold text-xl">Save for Later</button>
        </div>
      </div>
    </main>
  );
};

export default VaultCreateIdeaDepositIdeaPage;
