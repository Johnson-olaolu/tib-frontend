import React from "react";
import VaultDashboardHeader from "../components/layout/header";
import HomepageFooter from "@/app/components/HomepageFooter";

const VaultHomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <VaultDashboardHeader />
      {children}
      <HomepageFooter />
    </main>
  );
};

export default VaultHomeLayout;
