import ideaService from "@/services/idea.service";
import { IIdea, IdeaNeedEnum } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface IDashboardViewIdeaContext {
  vault: boolean;
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
    need?: IdeaNeedEnum;
  };
  vault?: boolean;
  type?: "query" | "user";
  count?: number;
}> = ({ children, query = {}, count = 9, type = "query", vault = false }) => {
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

  const { data: queryVaultIdeas, isFetching: isVaultFetching } = useQuery({
    queryKey: ["Idea", "vault", query],
    queryFn: async () => {
      const res = await ideaService.queryIdeaVault(query);
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
      setIdeas(vault ? queryVaultIdeas || [] : queryIdeas || []);
    } else {
      setIdeas(ideaDetails?.ideas || []);
    }
  }, [ideaDetails?.ideas, queryIdeas, queryVaultIdeas, type, vault]);

  const value = useMemo(
    () => ({
      vault,
      viewType,
      setViewType,
      ideas,
      isFetching: vault ? isVaultFetching : isFetching,
    }),
    [viewType, ideas, vault, isVaultFetching, isFetching]
  );
  return <DashboardViewIdeasContext.Provider value={value}>{children}</DashboardViewIdeasContext.Provider>;
};

const useDashboardViewIdeas = (): IDashboardViewIdeaContext => useContext(DashboardViewIdeasContext) as IDashboardViewIdeaContext;

export default useDashboardViewIdeas;
