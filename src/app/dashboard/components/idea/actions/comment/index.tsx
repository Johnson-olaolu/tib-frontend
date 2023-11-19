"use client";
import { IComment, IIdea, LIkeTypeEnum } from "@/services/types";
import userService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";
import CommentForm from "./CommentForm";

interface IIdeaComment {
  isCard?: boolean;
  idea?: IIdea;
  comment?: IComment;
  type?: LIkeTypeEnum;
  viewComments: () => void;
}

const IdeaComment: React.FC<IIdeaComment> = (props) => {
  const { isCard = false, idea, comment, type = LIkeTypeEnum.IDEA, viewComments } = props;
  const [showCommentForm, setShowCommentForm] = useState(false);
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

  return (
    <>
      <div className={`flex items-center text-tib-primary  ${isCard ? " gap-1 " : " gap-2"} `}>
        {true && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowCommentForm(!showCommentForm);
            }}
          >
            <FaRegComment size={isCard ? 18 : 24} role="button" className={``} />
          </button>
        )}
        <button onClick={() => viewComments()} className={`${isCard ? "text-xs" : "text-lg"}`}>
          {type == LIkeTypeEnum.IDEA ? idea?.comments.length : comment?.children?.length}{" "}
          {type == LIkeTypeEnum.IDEA && idea?.comments.length === 1
            ? "Comment"
            : type == LIkeTypeEnum.COMMENT && comment?.comment.length === 1
            ? "Comment"
            : "Comments"}
        </button>
      </div>
      {showCommentForm && <CommentForm type={type} idea={idea} comment={comment} closeCommentForm={() => setShowCommentForm(false)} />}
    </>
  );
};

export default IdeaComment;
