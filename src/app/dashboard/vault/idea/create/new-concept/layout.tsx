import React from "react";
import { VaultCreateIdeaNewConceptProvider } from "./context";

const VaultCreateIdeaNewConceptLayout = ({ children }: { children: React.ReactNode }) => {
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
      <VaultCreateIdeaNewConceptProvider>
        <div className=" py-20 px-16 h-screen  overflow-auto">{children}</div>
      </VaultCreateIdeaNewConceptProvider>
    </main>
  );
};

export default VaultCreateIdeaNewConceptLayout;
