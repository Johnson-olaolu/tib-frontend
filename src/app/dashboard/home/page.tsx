import React from "react";
import ViewAllIdeas from "./components/view-all-ideas";
import DashboardHomeJumbotron from "./components/jumbotron";

const DashboardHome = () => {
  return (
    <>
      <DashboardHomeJumbotron />
      <div
        className="py-32 "
        style={{ background: `url("/images/DashboardPageBg.png") #ffffff`, backgroundSize: "cover", backgroundRepeat: "space" }}
      >
        <div className="max-w-7xl mx-auto">
          <ViewAllIdeas />
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
