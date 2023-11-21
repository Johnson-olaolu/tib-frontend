import DashboardIdeaCard from "@/app/dashboard/components/idea/card";
import { DashboardViewIdeaContextProvider } from "@/app/dashboard/components/idea/context";
import { IUser } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IViewShares {
  user?: IUser;
}
const ViewShares: React.FC<IViewShares> = (props) => {
  const { user } = props;
  const { data: ideaDetails } = useQuery({
    queryKey: ["user", "userName", user?.userName, "ideaDetails"],
    queryFn: async () => {
      const res = await userService.getUserIdeaDetails(user?.id || "");
      return res.data;
    },
  });

  return (
    <div className=" mt-20">
      {ideaDetails?.sharedIdeas && ideaDetails?.sharedIdeas.length > 0 ? (
        <DashboardViewIdeaContextProvider>
          <div className=" grid grid-cols-3 gap-x-7 gap-y-14">
            {ideaDetails.sharedIdeas.map((idea) => (
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

export default ViewShares;
