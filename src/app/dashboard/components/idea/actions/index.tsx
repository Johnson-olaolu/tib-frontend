import React from "react";
import { IIdea } from "@/services/types";
import IdeaMessage from "./message";
import IdeaLike from "./like";
import IdeaShare from "./share";
import IdeaComment from "./comment";

interface ICardActions {
  idea?: IIdea;
}
const CardActions: React.FC<ICardActions> = (props) => {
  const { idea } = props;

  const handleButtonClick = (e: any) => {
    // Prevent the button click from triggering the link
    e.stopPropagation();
    e.preventDefault();

    // Your button click logic here
  };
  return (
    <div onClick={handleButtonClick} className="flex items-center justify-between relative">
      <IdeaMessage isCard />
      <IdeaLike isCard idea={idea} viewLikes={() => {}} />
      <IdeaShare isCard idea={idea} viewShares={() => {}} />
      <IdeaComment isCard idea={idea} viewComments={() => {}} />
    </div>
  );
};

export default CardActions;
