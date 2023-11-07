import useDashboardViewIdeas from "@/app/dashboard/home/components/view-all-ideas/context";
import React from "react";
import DashboardIdeaCard from "../card";

const DashboardIdeaGrid = () => {
  const { viewType, ideas, isFetching } = useDashboardViewIdeas();
  return (
    <div className="">
      {isFetching ? (
        <div className="">Loading...</div>
      ) : ideas && ideas.length > 0 ? (
        <div className={viewType === "grid" ? " grid grid-cols-3 gap-x-7 gap-y-14" : " grid grid-cols-1 gap-y-7"}>
          {ideas.map((idea) => (
            <DashboardIdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className=" flex justify-center">
          <p className="py-5 text-tib-primary2">No Ideas Available</p>
        </div>
      )}
    </div>
  );
};

export default DashboardIdeaGrid;
