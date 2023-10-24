import useDashboardViewIdeas from "@/app/dashboard/home/components/view-all-ideas/context";
import React from "react";
import DashboardIdeaCard from "../card";

const DashboardIdeaGrid = () => {
  const { viewType } = useDashboardViewIdeas();
  return (
    <div className={viewType === "grid" ? " grid grid-cols-3 gap-x-7 gap-y-14" : " grid grid-cols-1 gap-y-7"}>
      <DashboardIdeaCard type="basic" />
    </div>
  );
};

export default DashboardIdeaGrid;
