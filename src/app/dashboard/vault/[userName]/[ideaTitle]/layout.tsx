import React from "react";
import HomepageFooter from "@/app/components/HomepageFooter";
import VaultDashboardHeader from "../../components/layout/header";

const VaultHomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <VaultDashboardHeader />
      <section
        className=""
        style={{ background: `url("/images/DashboardPageBg.png") #ffffff`, backgroundSize: "100% auto", backgroundRepeat: "space" }}
      >
        {children}
      </section>
      <HomepageFooter />
    </main>
  );
};

export default VaultHomeLayout;
