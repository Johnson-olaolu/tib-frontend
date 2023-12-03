import React from "react";
import VaultDashboardHomeJumbotron from "./components/jumbotron";
import VaultThisWeek from "./components/this-week";
import VaultTrendingProfiles from "./components/treding-profiles";
import VaultViewAllIdeas from "./components/view-all-ideas";
import TellAFriend from "./components/TellAFriend";
import RecentActivities from "./components/recent-activities";

const VaultHomePage = () => {
  return (
    <>
      <VaultDashboardHomeJumbotron />
      <div
        className="py-32 "
        style={{ background: `url("/images/DashboardPageBg.png") #ffffff`, backgroundSize: "cover", backgroundRepeat: "space" }}
      >
        <div className=" max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <VaultTrendingProfiles />
            <VaultThisWeek />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24">
          <VaultViewAllIdeas />
        </div>
        <TellAFriend />
        <RecentActivities />
      </div>
    </>
  );
};

export default VaultHomePage;
