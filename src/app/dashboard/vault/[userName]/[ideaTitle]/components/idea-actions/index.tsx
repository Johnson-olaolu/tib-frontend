import ShareIcon from "@/app/assets/icons/ShareIcon";
import IdeaComment from "@/app/dashboard/components/idea/actions/comment";
import IdeaLike from "@/app/dashboard/components/idea/actions/like";
import IdeaShare from "@/app/dashboard/components/idea/actions/share";
import React from "react";
import useVaultIdeaPage from "../../context";
import IdeaMessage from "@/app/dashboard/components/idea/actions/message";
import VaultIdeaPageCommentForm from "./IdeaPageCommentForm";

const VaultIdeaActions = () => {
  const { idea, setShowSidebar } = useVaultIdeaPage();
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
        <VaultIdeaPageCommentForm idea={idea} />
      </div>
    </div>
  );
};

export default VaultIdeaActions;
