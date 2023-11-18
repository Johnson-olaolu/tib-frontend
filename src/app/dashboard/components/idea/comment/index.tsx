import Avatar from "@/components/extras/Avatar";
import ViewFormattedContent from "@/components/extras/ViewFormattedContent";
import { IComment, LIkeTypeEnum } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import React from "react";
import IdeaMessage from "../actions/message";
import IdeaLike from "../actions/like";
import IdeaShare from "../actions/share";
import IdeaComment from "../actions/comment";

interface IViewComment {
  comment?: IComment;
}
const ViewSingleComment: React.FC<IViewComment> = (props) => {
  const { comment } = props;
  const { data: user } = useQuery({
    queryKey: ["user", comment?.userId],
    queryFn: async () => {
      const res = await userService.findOneUser(comment?.userId || "");
      return res.data;
    },
  });
  return (
    <div className=" pb-8 border-b-2 border-[#E1DDDD]">
      <div className="flex items-center justify-between">
        <div className=" flex items-center gap-2">
          <Link href={`/${user?.userName}`}>
            <Avatar size="sm" user={user} />
          </Link>

          <div className=" flex flex-col">
            <Link href={`/${user?.userName}`} className=" font-bold text-tib-purple capitalize ">
              {user?.profile?.firstName ? `${user?.profile?.firstName} ${user?.profile?.lastName}` : `${user?.userName}`}
            </Link>
            <p className=" text-xs text-tib-primary w-40">
              {user?.profile?.interests.map((interest, idx) => (
                <>
                  {idx !== 0 && ", "}
                  <Link href={"#"} className="">
                    {interest}
                  </Link>
                </>
              ))}
            </p>
          </div>
        </div>
        <span className=" text-tib-primary2 capitalize">{moment(comment?.createdAt).fromNow()}</span>
      </div>
      <div className="mt-10 break-words">
        <p dangerouslySetInnerHTML={{ __html: comment?.comment || "" }} className=" text-sm  text-tib-primary2"></p>
        {/* <ViewFormattedContent content={comment?.comment || ""} /> */}
        {/* {comment?.comment} */}
      </div>
      <div className="mt-10 flex justify-between">
        <IdeaMessage isCard />
        <IdeaLike isCard comment={comment} viewLikes={() => {}} type={LIkeTypeEnum.COMMENT} />
        <IdeaShare isCard comment={comment} viewShares={() => {}} type={LIkeTypeEnum.COMMENT} />
        <IdeaComment isCard comment={comment} viewComments={() => {}} type={LIkeTypeEnum.COMMENT} />
      </div>
    </div>
  );
};

export default ViewSingleComment;
