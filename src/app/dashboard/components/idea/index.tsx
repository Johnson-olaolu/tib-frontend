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
  };
  count?: number;
  title?: string;
}> = (props) => {
  const { query, count, title } = props;
  return (
    <DashboardViewIdeaContextProvider query={query} count={count}>
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
