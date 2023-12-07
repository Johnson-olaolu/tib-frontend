"use client";
import IdeaActions from "@/app/[userName]/[ideaTitle]/components/idea-actions";
import IdeaSidebar from "@/app/[userName]/[ideaTitle]/components/sidebar";
import { IdeaPageProvider } from "@/app/[userName]/[ideaTitle]/context";
import FollowButton from "@/app/dashboard/components/user/FollowButton";
import Avatar from "@/components/extras/Avatar";
import ViewFormattedContent from "@/components/extras/ViewFormattedContent";
import ideaService from "@/services/idea.service";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { BsDot } from "react-icons/bs";
import TIBGetRating from "@/components/extras/GetRating";
import VaultCollaborators from "./components/VaultCollaborators";
import VaultLocation from "./components/VaultLocation";
import VaultWebsite from "./components/VaultWebsite";
import VaultSocialMedia from "./components/VaultSocialMedia";

const VaultIdeaPage: NextPage<any> = (props) => {
  const ideaTitle = decodeURIComponent(props.params.ideaTitle);
  const userName = decodeURIComponent(props.params.userName);

  const { data: user } = useQuery({
    queryKey: ["user", "userName", userName],
    queryFn: async () => {
      const res = await userService.queryUsers({ userName });
      return res.data![0];
    },
  });

  const { data: idea } = useQuery({
    queryKey: ["idea", user?.userName, ideaTitle],
    queryFn: async () => {
      const res = await ideaService.queryIdeaVault({ title: ideaTitle, user: user?.id });
      return res.data![0];
    },
  });
  return (
    <IdeaPageProvider idea={idea}>
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
                    <p className=" text-tib-primary2 text-xl flex gap-2 items-center">
                      <span className="">
                        {user?.profile?.interests.map((i, idx) => (
                          <>
                            {idx !== 0 && ", "}
                            <Link href={`/category/${i}`} className=" hover:underline" key={i}>
                              {i}
                            </Link>
                          </>
                        ))}
                      </span>
                      <TIBGetRating rating={5} />
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
            <div className="mt-16 px-20">
              <h2 className=" font-bold text-4xl text-black capitalize">{idea?.title}</h2>
              <div className="mt-10 min-h-[200px]" dangerouslySetInnerHTML={{ __html: idea?.description || "" }}>
                {/* <ViewFormattedContent content={idea?.description || ""} /> */}
              </div>
            </div>
            <div className=" mt-4 px-20">
              <IdeaActions />
            </div>
          </div>
          <IdeaSidebar />
        </div>
      </div>
      <div className=" py-16 px-40 bg-tib-light-blue grid grid-cols-2 gap-x-28">
        <div className=" space-y-5">
          <VaultCollaborators collaborators={idea?.collaborators} />
        </div>
        <div className=" space-y-5">
          <VaultLocation location={idea?.location} />
          <VaultWebsite />
          <VaultSocialMedia socialMediaLinks={idea?.socialMediaLinks} />
        </div>
      </div>
    </IdeaPageProvider>
  );
};

export default VaultIdeaPage;
