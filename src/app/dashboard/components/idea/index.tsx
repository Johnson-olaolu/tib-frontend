import React from "react";

interface IDashboardIdeaCard {
  view: "list" | "grid";
}

const DashboardIdeaCard: React.FC<IDashboardIdeaCard> = (props) => {
  const { view } = props;
  return <div>DashboardIdeaCard</div>;
};

export default DashboardIdeaCard;
