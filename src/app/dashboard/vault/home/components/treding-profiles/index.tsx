"use client";
import FollowButton from "@/app/dashboard/components/user/FollowButton";
import Avatar from "@/components/extras/Avatar";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const VaultTrendingProfiles = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const { data } = useQuery({
    queryKey: ["user", "profiles"],
    queryFn: async () => {
      const res = await userService.queryUsers({ name: "" });
      return res.data;
    },
  });
  const queriedData = data?.filter((d) => d.id !== user?.id);

  return (
    <div className=" bg-white rounded shadow border border-[#F5F5F5]  py-12 px-11 flex flex-col">
      <div className=" shrink-0">
        <h3 className=" capitalize text-tib-primary">Trending Profiles</h3>
      </div>
      <div className=" mt-10 flex-grow flex flex-col justify-between">
        <ul className="">
          {queriedData?.map((u, idx) => (
            <li className=" pb-4 flex justify-between items-center border-b border-[#F1F1F1] relative" key={u.id}>
              <span className=" transform -translate-x-5 absolute left-0 text-sm font-medium top-0">{idx + 1}.</span>
              <div className=" flex items-center gap-2">
                <Avatar size="sm" user={u} />
                <div className="">
                  <p className=" text-tib-purple font-bold">
                    {u?.profile?.firstName} {u?.profile?.lastName}
                  </p>
                  <p className=" text-sm text-tib-primary2">
                    {u?.profile?.interests.map((i, idx2) => (
                      <>
                        {idx2 !== 0 && ", "}
                        <Link href={`/category/${i}`} className=" hover:underline" key={i}>
                          {i}
                        </Link>
                      </>
                    ))}
                  </p>
                </div>
              </div>

              <FollowButton variant="text" externalUser={u} />
            </li>
          ))}
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
