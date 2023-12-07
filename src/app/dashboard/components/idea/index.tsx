import React from "react";
import { DashboardViewIdeaContextProvider } from "./context";
import ViewTypeFilter from "./filter/ViewTypeFilter";
import SortFilter from "./filter/SortFilter";
import DashboardIdeaGrid from "./grid";
import { IdeaNeedEnum } from "@/services/types";

const ViewIdeas: React.FC<{
  query?: {
    title?: string;
    spotlight?: boolean;
    category?: string;
    categories?: string[];
    user?: string;
    userName?: string;
    ideaNeed?: IdeaNeedEnum;
  };
  type?: "query" | "user";
  count?: number;
  title?: string;
  vault?: boolean;
}> = (props) => {
  const { query, count, title, type, vault = false } = props;
  return (
    <DashboardViewIdeaContextProvider vault={vault} query={query} count={count} type={type}>
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
