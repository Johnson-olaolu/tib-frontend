import { IIdea } from "@/services/types";
import React, { createContext, useContext, useMemo, useState } from "react";

interface IVaultIdeaPageContext {
  showSidebar: "likes" | "shares" | "comments" | null;
  idea?: IIdea;
  setShowSidebar: React.Dispatch<React.SetStateAction<"likes" | "shares" | "comments" | null>>;
}

const VaultIdeaPageContext = createContext({});

export const VaultIdeaPageProvider: React.FC<{
  children: React.ReactNode;
  idea?: IIdea;
}> = (props) => {
  const { children, idea } = props;
  const [showSidebar, setShowSidebar] = useState<"likes" | "shares" | "comments" | null>(null);

  const value = useMemo(
    () => ({
      idea,
      showSidebar,
      setShowSidebar,
    }),
    [showSidebar, idea]
  );

  return <VaultIdeaPageContext.Provider value={value}>{children}</VaultIdeaPageContext.Provider>;
};

const useVaultIdeaPage = (): IVaultIdeaPageContext => useContext(VaultIdeaPageContext) as IVaultIdeaPageContext;

export default useVaultIdeaPage;
