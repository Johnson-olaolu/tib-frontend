import ideaService from "@/services/idea.service";
import { IIdea } from "@/services/types";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface IDashboardViewIdeaContext {
  viewType: "list" | "grid";
  setViewType: React.Dispatch<React.SetStateAction<"list" | "grid">>;
  ideas: IIdea[];
  isFetching: boolean;
}

const DashboardViewIdeasContext = createContext({});

export const DashboardViewIdeaContextProvider: React.FC<{
  children: React.ReactNode;
  menu: "Spotlight" | "More" | string;
}> = ({ children, menu }) => {
  const [viewType, setViewType] = useState<"list" | "grid">("grid");

  const { data: ideas, isFetching } = useQuery({
    queryKey: ["Idea", menu],
    queryFn: async () => {
      let res;
      if (menu == "Spotlight") {
        res = await ideaService.queryIdeaSimple({
          spotlight: true,
        });
      } else if (menu == "More") {
        res = await ideaService.queryIdeaSimple({});
      } else {
        res = await ideaService.queryIdeaSimple({ category: menu });
      }
      return res.data;
    },
  });

  const value = useMemo(
    () => ({
      viewType,
      setViewType,
      ideas,
      isFetching,
    }),
    [viewType, menu, ideas, isFetching]
  );
  return <DashboardViewIdeasContext.Provider value={value}>{children}</DashboardViewIdeasContext.Provider>;
};

const useDashboardViewIdeas = (): IDashboardViewIdeaContext => useContext(DashboardViewIdeasContext) as IDashboardViewIdeaContext;

export default useDashboardViewIdeas;
