import React from "react";
import DashbaordHeader from "../components/layout/header";
import DashboardHomeJumbotron from "./components/jumbotron";
import HomepageFooter from "@/app/components/HomepageFooter";

const DashboardHomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <DashbaordHeader />
      {children}
      <HomepageFooter />
    </main>
  );
};

export default DashboardHomeLayout;
