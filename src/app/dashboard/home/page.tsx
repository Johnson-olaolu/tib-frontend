import React from "react";
import ViewAllIdeas from "./components/view-all-ideas";
import DashboardHomeJumbotron from "./components/jumbotron";

const DashboardHome = () => {
  return (
    <>
      <DashboardHomeJumbotron />
      <div
        className=" px-20 py-32 "
        style={{ background: `url("/images/DashboardPageBg.png") #ffffff`, backgroundSize: "cover", backgroundRepeat: "space" }}
      >
        <ViewAllIdeas />
      </div>
    </>
  );
};

export default DashboardHome;
