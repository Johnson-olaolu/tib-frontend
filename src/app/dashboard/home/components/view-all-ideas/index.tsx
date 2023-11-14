"use client";
import React, { useState } from "react";
import ViewIdeas from "@/app/dashboard/components/idea";
import { IIdeaQuery } from "@/services/types";

const viewIdeaMenu = ["Spotlight", "Arts", "Technology", "Entertainment", "Finance", "Business", "Music", "More"] as const;

const ViewAllIdeas = () => {
  const [activeMenu, setActiveMenu] = useState<(typeof viewIdeaMenu)[number]>("Spotlight");
  const [query, setQuery] = useState<IIdeaQuery>({});

  const onClickMenu = (menu: (typeof viewIdeaMenu)[number]) => {
    if (menu == "Spotlight") {
      setQuery({ spotlight: true });
    } else if (menu == "More") {
      setQuery({});
    } else {
      setQuery({ category: menu });
    }
    setActiveMenu(menu);
  };

  return (
    <div className="">
      <div className="">
        <ul className=" px-7 flex items-center gap-11 pb-5 border-b border-[#E8E3E3] max-w-max mx-auto">
          {viewIdeaMenu.map((ideaCategory) => (
            <li
              role="button"
              key={ideaCategory}
              className={` text-lg font-bold  ${activeMenu == ideaCategory ? "text-tib-blue" : "text-[#696868]"} uppercase`}
              onClick={() => onClickMenu(ideaCategory)}
            >
              {ideaCategory}
            </li>
          ))}
        </ul>
      </div>
      <div className=" my-10">
        <ViewIdeas query={query} />
      </div>
    </div>
  );
};

export default ViewAllIdeas;
