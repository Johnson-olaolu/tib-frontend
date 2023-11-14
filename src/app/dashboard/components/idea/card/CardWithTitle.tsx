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
            <span className=" text-sm text-tib-primary w-40">{idea.categories.map((c) => c.name).join(", ")}</span>
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
    <div className="px-16 py-8 rounded-lg border border-[#E8E5E5] bg-tib-white flex justify-between gap-36 items-start">
      <div className="flex items-start gap-10 flex-shrink-0">
        {/* <Image src="" height={100} width={100} className=" h-[100px] w-[100px] rounded-full flex-shrink-0" alt="profile picture" /> */}
        <div className=" h-[100px] w-[100px] rounded-full bg-gray-600 flex-shrink-0" />
        <div className="max-w-[540px]">
          <div className=" flex flex-col mb-8">
            <p className=" font-bold text-tib-purple ">Don Yepe</p>
            <span className=" text-sm text-tib-primary">Arts</span>
          </div>
          <div className=" mb-10">
            <p className="line-clamp-3 overflow-hidden overflow-ellipsis text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet orci leo hendrerit justo, ut lorem eget at blandit. Dolor velit vivamus
              eget commodo, elit. Commodo, nibh ultricies nunc at venenatis sed. Egestas ut volutpat integer bibendum a. Tincidunt velit nunc velit
              imperdiet massa feugiat quis etiam.
            </p>
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
      <div className=" flex flex-grow justify-between items-center">
        <span className=" text-sm text-tib-primary opacity-70">2 Hours Ago</span>
        <button className=" text-tib-blue">Follow</button>
      </div>
    </div>
  );
};

export default CardWithTitle;
