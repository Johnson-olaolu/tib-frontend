import React from "react";
import { IDashboardIdeaCard } from "..";
import useDashboardViewIdeas from "../../context";
import { useRouter } from "next13-progressbar";
import Link from "next/link";
import Avatar from "@/components/extras/Avatar";
import CardActions from "../../actions";
import { formatAmount, getInnertext } from "@/utils/misc";
import FollowButton from "../../../user/FollowButton";
import moment from "moment";
import TIBGetRating from "@/components/extras/GetRating";
import { IdeaNeedEnum } from "@/services/types";

const VaultCardWithTitle: React.FC<IDashboardIdeaCard> = (props) => {
  const { viewType } = useDashboardViewIdeas();
  const router = useRouter();
  const { idea } = props;

  const onClickIdea = () => {
    router.push(`/dashboard/vault/${idea.user.userName}/${encodeURIComponent(idea.title)}`);
  };

  return viewType === "grid" ? (
    <div
      role="link"
      onClick={() => onClickIdea()}
      className=" p-6 rounded-lg border border-[#E8E5E5] bg-tib-white flex flex-col h-[400px] cursor-pointer"
    >
      <div className=" flex items-center justify-between shrink-0">
        <div className=" flex gap-2 items-start">
          <div className=" flex items-center gap-2 ">
            <Link href={`/${idea.user.userName}`}>
              <Avatar size="sm" user={idea.user} />
            </Link>
            <div className=" flex flex-col">
              <Link href={`/${idea.user.userName}`} className=" font-bold text-tib-purple capitalize ">
                {idea.user.profile?.firstName ? `${idea.user.profile?.firstName} ${idea.user.profile?.lastName}` : `${idea.user.userName}`}
              </Link>
              <p className=" text-sm text-tib-primary max-w-[160px]">
                {idea.categories?.map((interest, idx) => (
                  <>
                    {idx !== 0 && ", "}
                    <Link href={`/category/${interest.name}`} className="">
                      {interest.name}
                    </Link>
                  </>
                ))}
              </p>
            </div>
          </div>
          <div className=" mt-1">
            <FollowButton size="sm" />
          </div>
        </div>
        <div className="">
          <TIBGetRating rating={5} />
        </div>
      </div>
      <div className=" mt-8 flex-grow  overflow-hidden">
        <div className=" flex items-center justify-between">
          <span className=" text-sm text-tib-primary opacity-70 capitalize">{moment(idea.createdAt).fromNow()}</span>
          <div className="">
            {idea.ideaNeed === IdeaNeedEnum.NEW_CONCEPT && <span className="text-tib-blue text-sm">{idea.seeking} Needed</span>}
            {idea.ideaNeed === IdeaNeedEnum.SALE && (
              <span className=" text-sm text-tib-primary2">
                {" "}
                <strong className=" text-tib-purple">
                  {idea.ideaCost?.currency} {formatAmount(idea.ideaCost?.value || 0)}{" "}
                </strong>{" "}
                Needed
              </span>
            )}
            {idea.ideaNeed === IdeaNeedEnum.FUNDING && (
              <span className=" text-sm text-tib-primary2">
                {" "}
                <strong className=" text-tib-purple">
                  {idea.ideaCost?.currency} {formatAmount(idea.estimationCost?.value || 0)}{" "}
                </strong>{" "}
                Needed
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 space-y-5">
          <h4 className=" text-lg text-tib-primary font-bold">{idea.title}</h4>
          <p className=" text-sm text-tib-primary2 line-clamp-6">{getInnertext(idea.description)}</p>
        </div>
      </div>

      <div className="mt-8 w-full shrink-0">
        <CardActions vault idea={idea} />
      </div>
    </div>
  ) : (
    <div
      role="link"
      onClick={() => onClickIdea()}
      className="px-16 py-8 rounded-lg border border-[#E8E5E5] bg-tib-white flex justify-between gap-36 items-start cursor-pointer"
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
              {idea.categories?.map((interest, idx) => (
                <>
                  {idx !== 0 && ", "}
                  <Link href={`/category/${interest.name}`} className="">
                    {interest.name}
                  </Link>
                </>
              ))}
            </p>
          </div>
          <div className=" mb-8">
            <h4 className=" text-lg text-tib-primary font-bold mb-2">{idea.title}</h4>
            <p className="line-clamp-3 text-sm ">{getInnertext(idea.description)}</p>
          </div>
          <div className="mt-8">
            <CardActions idea={idea} />
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center gap-32 shrink-0">
        <span className=" text-sm text-tib-primary opacity-70">{moment(idea.createdAt).fromNow()}</span>
        <FollowButton externalUser={idea.user} />
      </div>
    </div>
  );
};

export default VaultCardWithTitle;
