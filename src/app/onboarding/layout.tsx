import React from "react";
import { OnboardingContextProvider } from "./context";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`font-circularStd text-tib-primary h-screen overflow-hidden pb-2`}
      style={{
        background: `#ffffff url("/images/onboarding-bg.png")`,
        backgroundBlendMode: "multiply",
        backgroundSize: "100% 120%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" h-full overflow-auto">
        <div className="max-w-[672px] mx-auto pt-20">
          <OnboardingContextProvider>{children}</OnboardingContextProvider>
        </div>
      </div>
    </main>
  );
}
