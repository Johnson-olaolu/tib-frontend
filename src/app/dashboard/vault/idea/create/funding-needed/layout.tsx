import React from "react";
import { VaultCreateIdeaFundingNeededProvider } from "./context";

const VaultCreateIdeaDepositIdeaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={`font-circularStd text-tib-primary h-screen overflow-hidden   `}
      style={{
        background: `#ffffff url("/images/onboarding-bg.png")`,
        backgroundBlendMode: "multiply",
        backgroundSize: "100% 120%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <VaultCreateIdeaFundingNeededProvider>
        <div className=" py-20 px-16 h-screen  overflow-auto">{children}</div>
      </VaultCreateIdeaFundingNeededProvider>
    </main>
  );
};

export default VaultCreateIdeaDepositIdeaLayout;
