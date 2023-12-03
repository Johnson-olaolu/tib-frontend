import DashboardIdeaCard from "@/app/dashboard/components/idea/card";
import { DashboardViewIdeaContextProvider } from "@/app/dashboard/components/idea/context";
import categoryService from "@/services/category.service";
import { ICategory, IUser } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IViewShares {
  category?: ICategory;
}
const ViewCategoryShares: React.FC<IViewShares> = (props) => {
  const { category } = props;

  const { data: categoryDetails } = useQuery({
    queryKey: ["category", category?.name, "categoryDetails"],
    queryFn: async () => {
      const res = await categoryService.getCategoryDetails(category?.id);
      return res.data;
    },
  });

  return (
    <div className=" mt-20">
      {categoryDetails?.sharedIdeas && categoryDetails?.sharedIdeas.length > 0 ? (
        <DashboardViewIdeaContextProvider>
          <div className=" grid grid-cols-3 gap-x-7 gap-y-14">
            {categoryDetails.sharedIdeas.map((idea) => (
              <DashboardIdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </DashboardViewIdeaContextProvider>
      ) : (
        <div className=" text-center">
          <p className=" text-tib-primary py-3"> No Shares Found</p>
        </div>
      )}
    </div>
  );
};

export default ViewCategoryShares;
