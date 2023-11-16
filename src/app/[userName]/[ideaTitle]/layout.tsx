import React from "react";

export default function UserIdeaLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className=""
      style={{ background: `url("/images/DashboardPageBg.png") #ffffff`, backgroundSize: "100% auto", backgroundRepeat: "space" }}
    >
      {children}
    </section>
  );
}
