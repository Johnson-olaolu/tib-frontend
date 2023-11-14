import React from "react";
import DashboardIdeaCard from "../card";
import useDashboardViewIdeas from "../context";

const DashboardIdeaGrid = () => {
  const { viewType, ideas, isFetching } = useDashboardViewIdeas();
  return (
    <div className="">
      {isFetching ? (
        <div className="">Loading...</div>
      ) : ideas && ideas.length > 0 ? (
        <>
          <div className={viewType === "grid" ? " grid grid-cols-3 gap-x-7 gap-y-14" : " grid grid-cols-1 gap-y-7"}>
            {ideas.map((idea) => (
              <DashboardIdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
          <div className=" flex justify-center mt-14">
            <button className=" px-4 py-3 bg-tib-blue text-tib-white rounded"> Read More</button>
          </div>
        </>
      ) : (
        <div className=" flex justify-center">
          <p className="py-5 text-tib-primary2">No Ideas Available</p>
        </div>
      )}
    </div>
  );
};

export default DashboardIdeaGrid;
