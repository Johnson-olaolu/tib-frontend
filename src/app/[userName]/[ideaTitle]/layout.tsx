import React from "react";

export default function UserIdeaLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="" style={{ background: `url("/images/DashboardPageBg.png") #ffffff`, backgroundSize: "cover", backgroundRepeat: "space" }}>
      {children}
    </section>
  );
}
