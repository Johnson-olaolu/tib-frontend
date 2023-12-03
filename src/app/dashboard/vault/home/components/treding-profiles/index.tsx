import FollowButton from "@/app/dashboard/components/user/FollowButton";
import Avatar from "@/components/extras/Avatar";
import Link from "next/link";
import React from "react";

const VaultTrendingProfiles = () => {
  return (
    <div className=" bg-white rounded shadow border border-[#F5F5F5]  py-12 px-11 flex flex-col">
      <div className=" shrink-0">
        <h3 className=" capitalize text-tib-primary">This week on xela</h3>
      </div>
      <div className=" mt-10 flex-grow flex flex-col justify-between">
        <ul className=" list-disc">
          <li className=" pb-4 flex justify-between items-center border-b border-[#F1F1F1] relative">
            <span className=" transform -translate-x-5 absolute left-0 text-sm font-medium top-0">1.</span>
            <div className=" flex items-center gap-2">
              <Avatar size="sm" />
              <div className="">
                <p className=" text-tib-purple font-bold">Dina Wong</p>
                <p className=" text-sm text-tib-primary2"> Arts</p>
              </div>
            </div>

            <FollowButton variant="text" />
          </li>
        </ul>
        <div className=" mt-8 flex justify-center">
          <Link href={"#"} className="text-lg text-tib-blue">
            See All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VaultTrendingProfiles;
