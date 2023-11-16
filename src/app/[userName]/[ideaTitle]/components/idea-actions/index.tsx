import ShareIcon from "@/app/assets/icons/ShareIcon";
import CommentForm from "@/app/dashboard/components/idea/actions/comment/CommentForm";
import React from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";

const IdeaActions = () => {
  return (
    <div className="">
      <div className=" flex justify-between">
        <button className=" flex items-center gap-1 text-tib-primary">
          <BiMessageAltDetail size={24} />
          <span className="text-lg">Message</span>
        </button>
        <button className=" flex items-center gap-1 text-tib-primary">
          <SlLike size={24} />
          <span className="text-lg">Likes</span>
        </button>
        <button className=" flex items-center gap-1 text-tib-primary">
          <ShareIcon className=" scale-125" />
          <span className="text-lg">Shares</span>
        </button>
        <button className=" flex items-center gap-1 text-tib-primary">
          <FaRegComment size={24} />
          <span className="text-lg">Comments</span>
        </button>
      </div>
      <div className="mt-14">
        <CommentForm />
      </div>
    </div>
  );
};

export default IdeaActions;
