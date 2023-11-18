import ShareIcon from "@/app/assets/icons/ShareIcon";
import IdeaComment from "@/app/dashboard/components/idea/actions/comment";
import CommentForm from "@/app/dashboard/components/idea/actions/comment/CommentForm";
import IdeaLike from "@/app/dashboard/components/idea/actions/like";
import IdeaShare from "@/app/dashboard/components/idea/actions/share";
import { IIdea } from "@/services/types";
import React from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import useIdeaPage from "../../context";
import IdeaMessage from "@/app/dashboard/components/idea/actions/message";

const IdeaActions = () => {
  const { idea, setShowSidebar } = useIdeaPage();
  return (
    <div className="">
      <div className=" flex justify-between">
        <IdeaMessage />
        <IdeaLike
          idea={idea}
          viewLikes={() => {
            setShowSidebar("likes");
          }}
        />
        <IdeaShare
          idea={idea}
          viewShares={() => {
            setShowSidebar("shares");
          }}
        />
        <IdeaComment
          idea={idea}
          viewComments={() => {
            setShowSidebar("comments");
          }}
        />
      </div>
      <div className="mt-14">
        <CommentForm />
      </div>
    </div>
  );
};

export default IdeaActions;
