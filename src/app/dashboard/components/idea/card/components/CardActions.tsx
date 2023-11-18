import React from "react";
import IdeaComment from "../../actions/comment";
import IdeaLike from "../../actions/like";
import IdeaShare from "../../actions/share";
import IdeaMessage from "../../actions/message";
import { IIdea } from "@/services/types";

interface ICardActions {
  idea?: IIdea;
}
const CardActions: React.FC<ICardActions> = (props) => {
  const { idea } = props;
  return (
    <div className="flex items-center justify-between">
      <IdeaMessage isCard />
      <IdeaLike isCard idea={idea} viewLikes={() => {}} />
      <IdeaShare isCard idea={idea} viewShares={() => {}} />
      <IdeaComment isCard idea={idea} viewComments={() => {}} />
    </div>
  );
};

export default CardActions;
