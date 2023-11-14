import React from "react";
import DashbaordHeader from "../dashboard/components/layout/header";
import HomepageFooter from "../components/HomepageFooter";
import DashboardProvider from "../dashboard/provider";

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <DashboardProvider>
        <DashbaordHeader />
        {children}
        <HomepageFooter />
      </DashboardProvider>
    </main>
  );
}
