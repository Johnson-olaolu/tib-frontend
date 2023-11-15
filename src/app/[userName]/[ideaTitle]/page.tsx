"use client";
import ideaService from "@/services/idea.service";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import IdeaSidebar from "./components/Sidebar";
import FollowButton from "@/app/dashboard/components/user/FollowButton";
import Link from "next/link";
import Avatar from "@/components/extras/Avatar";
import { BsDot } from "react-icons/bs";
import moment from "moment";
import ViewFormattedContent from "@/components/extras/ViewFormattedContent";

const IdeaPage: NextPage<any> = (props) => {
  const ideaTitle = decodeURIComponent(props.params.ideaTitle);
  const userName = decodeURIComponent(props.params.userName);
  const descriptionRef = useRef<HTMLIFrameElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const { data: user } = useQuery({
    queryKey: ["user", "userName", userName],
    queryFn: async () => {
      const res = await userService.queryUsers({ userName });
      return res.data![0];
    },
  });

  const { data: idea } = useQuery({
    queryKey: ["Idea", user?.id, ideaTitle],
    queryFn: async () => {
      const res = await ideaService.queryIdeaSimple({ title: ideaTitle, user: user?.id });
      return res.data![0];
    },
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className=" flex gap-20">
        <div className=" flex-grow py-32">
          <div className="">
            <div className="  flex justify-between items-start">
              <div className=" flex gap-4 items-center">
                <Avatar size="lg" user={idea?.user} />
                <div className="">
                  <p className=" text-tib-purple  text-2xl font-bold flex items-center">
                    {user?.profile?.firstName} {user?.profile?.lastName}
                  </p>
                  <p className=" text-tib-primary2 text-xl">
                    {user?.profile?.interests.map((i, idx) => (
                      <>
                        {idx !== 0 && ", "}
                        <Link href={"#"} className="" key={i}>
                          {i}
                        </Link>
                      </>
                    ))}
                  </p>
                </div>
              </div>

              <FollowButton externalUser={idea?.user} variant="button" />
            </div>
            <div className="mt-12 pl-20">
              <p className=" flex items-center gap-1 text-tib-primary2">
                <span>{moment(idea?.createdAt).fromNow()}</span>
                <BsDot />
                <span>{moment(idea?.createdAt).format("Do MMMM YYYY")}</span>
              </p>
            </div>
          </div>
          <div className="mt-16">
            <h2 className=" font-bold text-4xl text-black">{idea?.title}</h2>
            <div className="mt-10">
              <ViewFormattedContent content={idea?.description || ""} />
            </div>
          </div>
        </div>
        {showSidebar && <IdeaSidebar />}
      </div>
    </div>
  );
};

export default IdeaPage;
