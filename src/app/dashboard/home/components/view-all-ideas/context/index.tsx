import React, { createContext, useContext, useMemo, useState } from "react";

interface IDashboardViewIdeaContext {
  viewType: "list" | "grid";
  setViewType: React.Dispatch<React.SetStateAction<"list" | "grid">>;
}

const DashboardViewIdeasContext = createContext({});

export const DashboardViewIdeaContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [viewType, setViewType] = useState<"list" | "grid">("grid");

  const value = useMemo(
    () => ({
      viewType,
      setViewType,
    }),
    [viewType]
  );
  return <DashboardViewIdeasContext.Provider value={value}>{children}</DashboardViewIdeasContext.Provider>;
};

const useDashboardViewIdeas = (): IDashboardViewIdeaContext => useContext(DashboardViewIdeasContext) as IDashboardViewIdeaContext;

export default useDashboardViewIdeas;
