"use client";
import React, { useEffect, useState } from "react";
import ViewIdeas from "@/app/dashboard/components/idea";
import { IIdeaQuery } from "@/services/types";

const viewIdeaMenu = ["Spotlight", "Arts", "Technology", "Entertainment", "Finance", "Business", "Music", "More"] as const;

const ViewAllIdeas = () => {
  const [activeMenu, setActiveMenu] = useState<(typeof viewIdeaMenu)[number]>("Spotlight");
  const [query, setQuery] = useState<IIdeaQuery>({});

  useEffect(() => {
    if (activeMenu == "Spotlight") {
      setQuery({ spotlight: true });
    } else if (activeMenu == "More") {
      setQuery({});
    } else {
      setQuery({ category: activeMenu });
    }
  }, [activeMenu]);

  return (
    <div className="">
      <nav className="">
        <ul className=" px-7 flex items-center gap-11 pb-5 border-b border-[#E8E3E3] max-w-max mx-auto">
          {viewIdeaMenu.map((menu) => (
            <li
              role="button"
              key={menu}
              className={` text-lg font-bold  ${activeMenu == menu ? "text-tib-blue" : "text-[#696868]"} uppercase`}
              onClick={() => setActiveMenu(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </nav>
      <div className=" my-10">
        <ViewIdeas query={query} />
      </div>
    </div>
  );
};

export default ViewAllIdeas;
