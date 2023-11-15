import ShareIcon from "@/app/assets/icons/ShareIcon";
import React from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { SlLike } from "react-icons/sl";
import { FaComment, FaRegComment } from "react-icons/fa6";
import { IDashboardIdeaCard } from ".";
import moment from "moment";
import Avatar from "@/components/extras/Avatar";
import { getInnertext } from "@/utils/misc";
import Link from "next/link";
import FollowButton from "../../user/FollowButton";
import useDashboardViewIdeas from "../context";

const CardWithTitle: React.FC<IDashboardIdeaCard> = (props) => {
  const { viewType } = useDashboardViewIdeas();
  const { idea } = props;

  return viewType === "grid" ? (
    <Link
      href={`/${idea.user.userName}/${encodeURIComponent(idea.title)}`}
      className=" p-6 rounded-lg border border-[#E8E5E5] bg-tib-white flex flex-col h-[400px]"
    >
      <div className=" flex items-center justify-between shrink-0">
        <div className=" flex items-center gap-2">
          <Link href={`/${idea.user.userName}`}>
            <Avatar size="sm" user={idea.user} />
          </Link>

          <div className=" flex flex-col">
            <Link href={`/${idea.user.userName}`} className=" font-bold text-tib-purple capitalize ">
              {idea.user.profile?.firstName ? `${idea.user.profile?.firstName} ${idea.user.profile?.lastName}` : `${idea.user.userName}`}
            </Link>
            <p className=" text-sm text-tib-primary w-40">
              {idea.categories.map((interest, idx) => (
                <>
                  {idx !== 0 && ", "}
                  <Link href={"#"} className="">
                    {interest.name}
                  </Link>
                </>
              ))}
            </p>
          </div>
        </div>
        <FollowButton externalUser={idea.user} />
      </div>
      <div className=" mt-8 flex-grow  overflow-hidden">
        <span className=" text-sm text-tib-primary opacity-70 capitalize">{moment(idea.createdAt).fromNow()}</span>
        <div className="mt-5 space-y-5">
          <h4 className=" text-lg text-tib-primary font-bold">{idea.title}</h4>
          <p className=" text-sm text-tib-primary2">{getInnertext(idea.description)}</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between shrink-0">
        <button className=" flex items-center gap-1 text-tib-primary opacity-70">
          <BiMessageAltDetail size={16} />
          <span className="text-xs">Message</span>
        </button>
        <button className=" flex items-center gap-1 text-tib-primary opacity-70">
          <SlLike size={16} />
          <span className="text-xs">Likes</span>
        </button>
        <button className=" flex items-center gap-1 text-tib-primary opacity-70">
          <ShareIcon />
          <span className="text-xs">Shares</span>
        </button>
        <button className=" flex items-center gap-1 text-tib-primary opacity-70">
          <FaRegComment size={16} />
          <span className="text-xs">Comments</span>
        </button>
      </div>
    </Link>
  ) : (
    <Link
      href={`/${idea.user.userName}/${encodeURIComponent(idea.title)}`}
      className="px-16 py-8 rounded-lg border border-[#E8E5E5] bg-tib-white flex justify-between gap-36 items-start"
    >
      <div className="flex items-start gap-10 flex-grow">
        <Link href={`/${idea.user.userName}`}>
          <Avatar size="xl" user={idea.user} />
        </Link>
        <div className="max-w-[540px]">
          <div className=" flex flex-col mb-6">
            <Link href={`/${idea.user.userName}`} className=" font-bold text-tib-purple capitalize ">
              {idea.user.profile?.firstName ? `${idea.user.profile?.firstName} ${idea.user.profile?.lastName}` : `${idea.user.userName}`}
            </Link>
            <p className=" text-sm text-tib-primary">
              {idea.categories.map((interest, idx) => (
                <>
                  {idx !== 0 && ", "}
                  <Link href={"#"} className="">
                    {interest.name}
                  </Link>
                </>
              ))}
            </p>
          </div>
          <div className=" mb-8">
            <h4 className=" text-lg text-tib-primary font-bold mb-2">{idea.title}</h4>
            <p className="line-clamp-3 text-sm">{getInnertext(idea.description)}</p>
          </div>
          <div className="mt-8 flex items-center gap-12">
            <button className=" flex items-center gap-1 text-tib-primary opacity-70">
              <BiMessageAltDetail size={16} />
              <span className="text-xs">Message</span>
            </button>
            <button className=" flex items-center gap-1 text-tib-primary opacity-70">
              <SlLike size={16} />
              <span className="text-xs">Likes</span>
            </button>
            <button className=" flex items-center gap-1 text-tib-primary opacity-70">
              <ShareIcon />
              <span className="text-xs">Shares</span>
            </button>
            <button className=" flex items-center gap-1 text-tib-primary opacity-70">
              <FaRegComment size={16} />
              <span className="text-xs">Comments</span>
            </button>
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center gap-32 shrink-0">
        <span className=" text-sm text-tib-primary opacity-70">{moment(idea.createdAt).fromNow()}</span>
        <FollowButton externalUser={idea.user} />
      </div>
    </Link>
  );
};

export default CardWithTitle;
