"use client";
import { IComment, IIdea, LIkeTypeEnum } from "@/services/types";
import userService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { FaRegComment } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";

interface IIdeaComment {
  isCard?: boolean;
  idea?: IIdea;
  comment?: IComment;
  type?: LIkeTypeEnum;
  viewComments: () => void;
}

const IdeaComment: React.FC<IIdeaComment> = (props) => {
  const { isCard = false, idea, comment, type = LIkeTypeEnum.IDEA, viewComments } = props;
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const isUserAuthor = useMemo(() => {
    return idea?.user.id == currentUser?.id;
  }, [currentUser?.id, idea?.user.id]);

  const handleClick = () => {};

  return (
    <div className={`flex items-center text-tib-primary  ${isCard ? " gap-1 " : " gap-2"} `}>
      {!isUserAuthor && <FaRegComment onClick={() => handleClick} size={isCard ? 1 : 24} role="button" className={``} />}
      <button onClick={() => viewComments()} className={`${isCard ? "text-xs" : "text-lg"}`}>
        {type == LIkeTypeEnum.IDEA ? idea?.comments.length : comment?.comments?.length}{" "}
        {type == LIkeTypeEnum.IDEA && idea?.comments.length === 1
          ? "Comment"
          : type == LIkeTypeEnum.COMMENT && comment?.comment.length === 1
          ? "Comment"
          : "Comments"}
      </button>
    </div>
  );
};

export default IdeaComment;
