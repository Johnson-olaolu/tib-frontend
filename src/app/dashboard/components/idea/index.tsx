import React from "react";
import { DashboardViewIdeaContextProvider } from "./context";
import ViewTypeFilter from "./filter/ViewTypeFilter";
import SortFilter from "./filter/SortFilter";
import DashboardIdeaGrid from "./grid";

const ViewIdeas: React.FC<{
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
  title?: string;
}> = (props) => {
  const { query, count, title, type } = props;
  return (
    <DashboardViewIdeaContextProvider query={query} count={count} type={type}>
      <>
        <div className=" flex justify-between gap-4 mb-8">
          <h4 className=" text-2xl text-tib-purple font-bold">{title}</h4>
          <div className="flex gap-4 ">
            <ViewTypeFilter />
            <SortFilter />
          </div>
        </div>
        <DashboardIdeaGrid />
      </>
    </DashboardViewIdeaContextProvider>
  );
};

export default ViewIdeas;
