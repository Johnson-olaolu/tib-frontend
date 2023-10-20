import React from "react";
import ViewAllIdeas from "./components/view-all-ideas";

const DashboardHome = () => {
  return (
    <div
      className=" px-20 py-32 "
      style={{ background: `url("/images/DashboardPageBg.png") #ffffff`, backgroundSize: "cover", backgroundRepeat: "space" }}
    >
      <ViewAllIdeas />
    </div>
  );
};

export default DashboardHome;
