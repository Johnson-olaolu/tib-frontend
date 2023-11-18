import { IComment, IIdea, LIkeTypeEnum } from "@/services/types";
import React from "react";
import { BiMessageAltDetail } from "react-icons/bi";

interface IIdeaMessage {
  isCard?: boolean;
  idea?: IIdea;
  comment?: IComment;
  type?: LIkeTypeEnum;
  // viewLikes: () => void;
}
const IdeaMessage: React.FC<IIdeaMessage> = (props) => {
  const { isCard = false } = props;
  return (
    <div className={`flex items-center text-tib-primary  ${isCard ? " gap-1 " : " gap-2"} `}>
      <BiMessageAltDetail size={isCard ? 18 : 24} role="button" />
      <span className={`${isCard ? "text-xs" : "text-lg"}`}>Message</span>
    </div>
  );
};

export default IdeaMessage;
