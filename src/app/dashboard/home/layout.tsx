import React from "react";
import DashbaordHeader from "../components/layout/header";
import DashboardHomeJumbotron from "./components/jumbotron";

const DashboardHomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <DashbaordHeader />
      <DashboardHomeJumbotron />
      {children}
    </main>
  );
};

export default DashboardHomeLayout;
