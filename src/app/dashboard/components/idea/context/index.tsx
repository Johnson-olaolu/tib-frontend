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
  query?: {
    title?: string;
    spotlight?: boolean;
    category?: string;
    categories?: string[];
    user?: string;
  };
  count?: number;
}> = ({ children, query = {}, count = 9 }) => {
  const [viewType, setViewType] = useState<"list" | "grid">("grid");

  const { data: ideas, isFetching } = useQuery({
    queryKey: ["Idea", query],
    queryFn: async () => {
      const res = await ideaService.queryIdeaSimple(query);
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
    [viewType, ideas, isFetching]
  );
  return <DashboardViewIdeasContext.Provider value={value}>{children}</DashboardViewIdeasContext.Provider>;
};

const useDashboardViewIdeas = (): IDashboardViewIdeaContext => useContext(DashboardViewIdeasContext) as IDashboardViewIdeaContext;

export default useDashboardViewIdeas;
