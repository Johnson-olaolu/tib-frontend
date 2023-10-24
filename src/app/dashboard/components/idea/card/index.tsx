import React from "react";
import BasicCard from "./BasicCard";

interface IDashboardIdeaCard {
  type: "basic";
}

const DashboardIdeaCard: React.FC<IDashboardIdeaCard> = (props) => {
  const { type } = props;

  switch (type) {
    case "basic":
      return <BasicCard />;
    default:
      return <></>;
  }
};

export default DashboardIdeaCard;
