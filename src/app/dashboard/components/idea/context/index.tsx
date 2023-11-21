import ideaService from "@/services/idea.service";
import { IIdea } from "@/services/types";
import userService from "@/services/user.service";
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
    userName?: string;
  };
  type?: "query" | "user";
  count?: number;
}> = ({ children, query = {}, count = 9, type = "query" }) => {
  const [viewType, setViewType] = useState<"list" | "grid">("grid");
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [sort, setSort] = useState("");

  const { data: queryIdeas, isFetching } = useQuery({
    queryKey: ["Idea", query],
    queryFn: async () => {
      const res = await ideaService.queryIdeaSimple(query);
      return res.data;
    },
  });

  const { data: ideaDetails } = useQuery({
    queryKey: ["user", "userName", query.userName, "ideaDetails"],
    queryFn: async () => {
      const res = await userService.getUserIdeaDetails(query.user || "");
      return res.data;
    },
  });

  useEffect(() => {
    if (type == "query") {
      setIdeas(queryIdeas || []);
    } else {
      setIdeas(ideaDetails?.ideas || []);
    }
  }, [ideaDetails?.ideas, queryIdeas, type]);

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
