import ShareIcon from "@/app/assets/icons/ShareIcon";
import IdeaComment from "@/app/dashboard/components/idea/actions/comment";
import IdeaLike from "@/app/dashboard/components/idea/actions/like";
import IdeaShare from "@/app/dashboard/components/idea/actions/share";
import React from "react";
import useIdeaPage from "../../context";
import IdeaMessage from "@/app/dashboard/components/idea/actions/message";
import IdeaPageCommentForm from "./IdeaPageCommentForm";

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
        <IdeaPageCommentForm idea={idea} />
      </div>
    </div>
  );
};

export default IdeaActions;
