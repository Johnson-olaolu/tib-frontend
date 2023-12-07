import React, { useMemo } from "react";
import BasicCard from "./BasicCard";
import { IIdea, IdeaTypeEnum } from "@/services/types";
import CardWithTitle from "./CardWithTitle";
import VaultCardWithTitle from "./vault/VaultCardWithTitle";

export interface IDashboardIdeaCard {
  idea: IIdea;
}

const DashboardIdeaCard: React.FC<IDashboardIdeaCard> = (props) => {
  const { idea } = props;

  const type: "basic" | "cardWithTitle" = useMemo(() => {
    if (idea.title) {
      return "cardWithTitle";
    }
    return "basic";
  }, [idea]);

  if (idea.ideaType === IdeaTypeEnum.VAULT) {
    switch (type) {
      case "cardWithTitle":
        return <VaultCardWithTitle idea={idea} />;
      case "basic":
        return <BasicCard />;
      default:
        return <BasicCard />;
    }
  } else {
    switch (type) {
      case "cardWithTitle":
        return <CardWithTitle idea={idea} />;
      case "basic":
        return <BasicCard />;
      default:
        return <BasicCard />;
    }
  }
};

export default DashboardIdeaCard;
