import React, { createContext, useContext, useMemo, useState } from "react";

interface IIdeaPageContext {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const IdeaPageContext = createContext({});

export const IdeaPageProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;
  const [showSidebar, setShowSidebar] = useState(false);

  const value = useMemo(
    () => ({
      showSidebar,
      setShowSidebar,
    }),
    [showSidebar]
  );

  return <IdeaPageContext.Provider value={value}>{children}</IdeaPageContext.Provider>;
};

const useIdeaPage = (): IIdeaPageContext => useContext(IdeaPageContext) as IIdeaPageContext;

export default useIdeaPage;
