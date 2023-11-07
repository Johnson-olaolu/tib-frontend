import React, { useMemo } from "react";
import BasicCard from "./BasicCard";
import { IIdea } from "@/services/types";
import CardWithTitle from "./CardWithTitle";

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

  switch (type) {
    case "cardWithTitle":
      return <CardWithTitle idea={idea} />;
    case "basic":
      return <BasicCard />;
    default:
      return <BasicCard />;
  }
};

export default DashboardIdeaCard;
