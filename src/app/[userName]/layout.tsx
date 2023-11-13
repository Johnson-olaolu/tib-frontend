import React from "react";
import DashbaordHeader from "../dashboard/components/layout/header";

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <DashbaordHeader />
      {children}
    </main>
  );
}
