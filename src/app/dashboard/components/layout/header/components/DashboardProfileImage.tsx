"use client";
import React, { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { IUser } from "@/services/types";
import { getInitials } from "@/utils/misc";
import { PiPencilSimpleLight } from "react-icons/pi";
import Link from "next/link";
import { BiLogOutCircle } from "react-icons/bi";
const DashboardProfileImage = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>(["user"]);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="relative">
      <div className="" role="button" onClick={() => setShowProfile(!showProfile)}>
        {user?.profile?.profilePicture ? (
          <div
            className="h-[52px] w-[52px] rounded-full"
            style={{ backgroundImage: `url(${user.profile.profilePicture})`, backgroundSize: "100% 100%", backgroundPosition: "center" }}
          ></div>
        ) : (
          <div className=" rounded-full bg-tib-purple h-[52px] w-[52px] overflow-hidden flex items-center justify-center">
            <span className="text-xl font-bold text-white uppercase">{getInitials(user)}</span>
          </div>
        )}
      </div>
      {showProfile && (
        <div className="absolute -bottom-3 -right-7 w-[292px] transform translate-y-full rounded overflow-hidden">
          <div className=" h-[72px] bg-[#DAF2FF] relative ">
            <PiPencilSimpleLight size={24} className=" right-6 bottom-4 absolute" />
            <div className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              {user?.profile?.profilePicture ? (
                <div
                  className="h-[62px] w-[62px] rounded-full"
                  style={{ backgroundImage: `url(${user.profile.profilePicture})`, backgroundSize: "100% 100%", backgroundPosition: "center" }}
                ></div>
              ) : (
                <div className=" rounded-full bg-tib-purple h-[62px] w-[62px] overflow-hidden flex items-center justify-center">
                  <span className="text-xl font-bold text-white uppercase">{getInitials(user)}</span>
                </div>
              )}
            </div>
          </div>
          <div className="pt-12 bg-white text-center px-11 pb-8">
            <div className=" text-center">
              <h6 className="text-[#403E3E] font-bold text-xl">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </h6>
              <p className=" text-[#59585B]">{user?.email}</p>
              <p className=" text-[#9F9EA1] text-sm">{user?.userName}</p>
            </div>

            <Link href={"#"} className="mt-6 text-tib-blue font-bold text-center mx-auto inline-block mb-5">
              View Profile
            </Link>
            <div className=" h-px w-full bg-[#403E3E]"></div>
            <div className="mt-6 text-center ">
              <button className=" space-x-3 inline-flex items-center">
                <BiLogOutCircle size={24} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProfileImage;
