import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const IdeaEngagementCard = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });
  const { data: ideaDetails } = useQuery({
    queryKey: ["user", "userName", user?.userName, "ideaDetails"],
    queryFn: async () => {
      const res = await userService.getUserIdeaDetails(user?.id || "");
      return res.data;
    },
  });
  return (
    <div
      className=" h-60 w-[262px] rounded p-6 flex flex-col justify-between items-center bg-tib-white"
      style={{
        boxShadow: "6.58125px 6.58125px 11.51719px 0px rgba(194, 191, 191, 0.20)",
      }}
    >
      <p className=" text-xl font-bold text-tib-purple">My Ideas</p>
      <div className="relative">
        <svg
          className=" absolute left-1/2 transform -translate-x-1/2"
          width="183"
          height="166"
          viewBox="0 0 183 166"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M176.583 83C180.127 83 183.028 80.122 182.727 76.5914C181.048 56.9231 171.686 38.3581 156.2 24.3101C139.04 8.74462 115.767 1.66193e-06 91.4995 0C67.2322 -1.66193e-06 43.9588 8.74461 26.7992 24.3101C11.3127 38.358 1.95079 56.9231 0.272461 76.5913C-0.028815 80.122 2.87207 83 6.41555 83C9.95902 83 12.7988 80.1201 13.149 76.5939C14.7955 60.0169 22.7936 44.4051 35.8729 32.5409C50.626 19.1583 70.6355 11.64 91.4995 11.64C112.364 11.64 132.373 19.1583 147.126 32.5409C160.205 44.4051 168.204 60.0169 169.85 76.594C170.2 80.1201 173.04 83 176.583 83Z"
            fill="#E6D6FF"
          />
          <path
            d="M27.7769 31.26C25.2501 29.2084 21.5573 29.3945 19.4316 31.8593C8.60869 44.4083 2.00041 59.5168 0.387092 75.3672C0.0183943 78.9896 2.99919 81.9863 6.64002 82.028C10.2682 82.0696 13.2469 79.1591 13.6658 75.555C15.1264 62.9878 20.261 50.9984 28.5344 40.8333C30.8907 37.9383 30.6746 33.6129 27.7769 31.26Z"
            fill="#260060"
          />
        </svg>
        <div className="text-tib-purple flex flex-col gap-3 items-center pt-8 relative z-10 ">
          <div className=" text-center">
            <p className=" text-4xl font-bold ">19%</p>
          </div>
          <div className="text-center mt-10">
            <p className="text-xs">Shared within the last 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaEngagementCard;
