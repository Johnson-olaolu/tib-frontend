"use client";
import useToast from "@/context/toast";
import ideaService from "@/services/idea.service";
import { IComment, IIdea, LIkeTypeEnum } from "@/services/types";
import userService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { SlLike } from "react-icons/sl";

interface IIdeaLike {
  isCard?: boolean;
  idea?: IIdea;
  comment?: IComment;
  type?: LIkeTypeEnum;
  viewLikes: () => void;
}

const IdeaLike: React.FC<IIdeaLike> = (props) => {
  const { isCard = false, idea, comment, type = LIkeTypeEnum.IDEA, viewLikes } = props;
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const likeIdeaMutation = useMutation({
    mutationFn: async () => {
      const res = await ideaService.like(type == LIkeTypeEnum.IDEA ? idea?.id || "" : comment?.id || "", currentUser?.id || "", type);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["idea", idea?.user?.userName, idea?.title] });
    },
  });

  const unLikeIdeaMutation = useMutation({
    mutationFn: async () => {
      const res = await ideaService.unLike(idea?.id || "", idea?.likes.find((l) => l.userId === currentUser?.id)?.id || "");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["idea", idea?.user?.userName, idea?.title] });
    },
  });

  const isLiked = useMemo(() => {
    return idea?.likes.findIndex((l) => l.userId === currentUser?.id) !== -1;
  }, [currentUser?.id, idea?.likes]);

  const isUserAuthor = useMemo(() => {
    return idea?.user.id == currentUser?.id;
  }, [currentUser?.id, idea?.user.id]);

  const handleClick = () => {
    if (isLiked) {
      unLikeIdeaMutation.mutate();
    } else {
      likeIdeaMutation.mutate();
    }
  };

  return (
    <div className={`flex items-center text-tib-primary  ${isCard ? " gap-1 " : " gap-2"} `}>
      {!isUserAuthor && (
        <SlLike onClick={() => handleClick()} size={isCard ? 18 : 24} role="button" className={`${isLiked ? "text-tib-blue" : ""}`} />
      )}
      <button onClick={() => viewLikes()} className={`${isCard ? "text-xs" : "text-lg"}`}>
        {type == LIkeTypeEnum.IDEA ? idea?.likes.length : comment?.likes?.length}{" "}
        {type == LIkeTypeEnum.IDEA && idea?.likes.length === 1
          ? "Like"
          : type == LIkeTypeEnum.COMMENT && comment?.likes.length === 1
          ? "Like"
          : "Likes"}
      </button>
    </div>
  );
};

export default IdeaLike;
