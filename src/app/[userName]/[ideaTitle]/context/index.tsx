import { IIdea } from "@/services/types";
import React, { createContext, useContext, useMemo, useState } from "react";

interface IIdeaPageContext {
  showSidebar: "likes" | "shares" | "comments" | null;
  idea?: IIdea;
  setShowSidebar: React.Dispatch<React.SetStateAction<"likes" | "shares" | "comments" | null>>;
}

const IdeaPageContext = createContext({});

export const IdeaPageProvider: React.FC<{
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

  return <IdeaPageContext.Provider value={value}>{children}</IdeaPageContext.Provider>;
};

const useIdeaPage = (): IIdeaPageContext => useContext(IdeaPageContext) as IIdeaPageContext;

export default useIdeaPage;
