"use client";
import React, { useEffect, useState } from "react";
import ViewIdeas from "@/app/dashboard/components/idea";
import { IIdeaQuery, IdeaNeedEnum } from "@/services/types";

const viewIdeaMenu = ["Spotlight", "Art", "Technology", "Entertainment", "Finance", "Business", "Music", "More"] as const;
const IdeaNeedMenu = ["Top Rated", "Funding Needed", "Ideas for Sale", "New Concepts"] as const;

const VaultViewAllIdeas = () => {
  const [activeMenu, setActiveMenu] = useState<(typeof viewIdeaMenu)[number]>("Spotlight");
  const [activeIdeaNeed, setactiveIdeaNeed] = useState<(typeof IdeaNeedMenu)[number]>("Top Rated");
  const [query, setQuery] = useState<IIdeaQuery>({});

  useEffect(() => {
    let need: IdeaNeedEnum | undefined;
    if (activeIdeaNeed === "Funding Needed") {
      need = IdeaNeedEnum.FUNDING;
    } else if (activeIdeaNeed === "New Concepts") {
      need = IdeaNeedEnum.NEW_CONCEPT;
    } else if (activeIdeaNeed === "Ideas for Sale") {
      need = IdeaNeedEnum.SALE;
    } else {
      need = undefined;
    }

    if (activeMenu == "Spotlight") {
      setQuery({ spotlight: true, ideaNeed: need });
    } else if (activeMenu == "More") {
      setQuery({ ideaNeed: need });
    } else {
      setQuery({ category: activeMenu, ideaNeed: need });
    }
  }, [activeIdeaNeed, activeMenu]);

  return (
    <div className="">
      <nav className="">
        <ul className=" flex justify-center  gap-2 mb-20">
          {IdeaNeedMenu.map((need) => (
            <li
              onClick={() => setactiveIdeaNeed(need)}
              className={`p-4 text-xl rounded ${activeIdeaNeed === need ? "bg-tib-blue text-tib-white" : "text-tib-primary2"} `}
              role="button"
              key={need}
            >
              {need}
            </li>
          ))}
        </ul>
      </nav>
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
        <ViewIdeas vault query={query} />
      </div>
    </div>
  );
};

export default VaultViewAllIdeas;
