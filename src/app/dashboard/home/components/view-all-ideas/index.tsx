"use client";
import DashboardIdeaCard from "@/app/dashboard/components/idea/card";
import SortFilter from "@/app/dashboard/components/idea/filter/SortFilter";
import ViewTypeFilter from "@/app/dashboard/components/idea/filter/ViewTypeFilter";
import React, { useState } from "react";
import { DashboardViewIdeaContextProvider } from "./context";
import DashboardIdeaGrid from "@/app/dashboard/components/idea/grid";

const viewIdeaMenu = ["Spotlight", "Arts", "Technology", "Entertainment", "Finance", "Business", "Music", "More"];

const ViewAllIdeas = () => {
  const [activeMenu, setActiveMenu] = useState("Spotlight");
  return (
    <div className="">
      <div className="">
        <ul className=" px-7 flex items-center gap-11 pb-5 border-b border-[#E8E3E3] max-w-max mx-auto">
          {viewIdeaMenu.map((ideaCategory) => (
            <li
              role="button"
              key={ideaCategory}
              className={` text-lg font-bold  ${activeMenu == ideaCategory ? "text-tib-blue" : "text-[#696868]"} uppercase`}
              onClick={() => setActiveMenu(ideaCategory)}
            >
              {ideaCategory}
            </li>
          ))}
        </ul>
      </div>
      <div className=" my-10">
        <DashboardViewIdeaContextProvider>
          <>
            <div className=" flex justify-end gap-4 mb-8">
              <ViewTypeFilter />
              <SortFilter />
            </div>
            <DashboardIdeaGrid />
          </>
        </DashboardViewIdeaContextProvider>
      </div>
    </div>
  );
};

export default ViewAllIdeas;
