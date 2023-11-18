"use client";
import ShareIcon from "@/app/assets/icons/ShareIcon";
import useToast from "@/context/toast";
import ideaService from "@/services/idea.service";
import { IComment, IIdea, LIkeTypeEnum } from "@/services/types";
import userService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { SlLike } from "react-icons/sl";

interface IIdeaShare {
  isCard?: boolean;
  idea?: IIdea;
  comment?: IComment;
  type?: LIkeTypeEnum;
  viewShares: () => void;
}

const IdeaShare: React.FC<IIdeaShare> = (props) => {
  const { isCard = false, idea, comment, type = LIkeTypeEnum.IDEA, viewShares } = props;
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const shareIdeaMutation = useMutation({
    mutationFn: async () => {
      const res = await ideaService.share(type == LIkeTypeEnum.IDEA ? idea?.id || "" : comment?.id || "", currentUser?.id || "", type);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["idea", idea?.user?.userName, idea?.title] });
    },
  });

  const unShareIdeaMutation = useMutation({
    mutationFn: async () => {
      const res = await ideaService.unShare(idea?.id || "", idea?.shares.find((l) => l.userId === currentUser?.id)?.id || "");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["idea", idea?.user?.userName, idea?.title] });
    },
  });

  const isShared = useMemo(() => {
    if (type === LIkeTypeEnum.IDEA) {
      return idea?.shares.findIndex((l) => l.userId === currentUser?.id) !== -1;
    }

    if (type === LIkeTypeEnum.COMMENT) {
      return comment?.shares.findIndex((l) => l.userId === currentUser?.id) !== -1;
    }
  }, [comment?.shares, currentUser?.id, idea?.shares, type]);

  const isUserAuthor = useMemo(() => {
    if (type === LIkeTypeEnum.IDEA) {
      return idea?.user.id == currentUser?.id;
    }

    if (type === LIkeTypeEnum.COMMENT) {
      return comment?.userId == currentUser?.id;
    }
  }, [comment?.userId, currentUser?.id, idea?.user.id, type]);

  const handleClick = () => {
    if (isShared) {
      unShareIdeaMutation.mutate();
    } else {
      shareIdeaMutation.mutate();
    }
  };

  return (
    <div className={`flex items-center text-tib-primary  ${isCard ? " gap-1 " : " gap-2"} `}>
      {!isUserAuthor && (
        <ShareIcon onClick={() => handleClick()} role="button" className={`${isCard ? "" : "scale-125"}   ${isShared ? "text-tib-blue" : ""}`} />
      )}
      <button onClick={() => viewShares()} className={`${isCard ? "text-xs" : "text-lg"}`}>
        {type == LIkeTypeEnum.IDEA ? idea?.shares.length : comment?.shares?.length}{" "}
        {type == LIkeTypeEnum.IDEA && idea?.shares.length === 1
          ? "Share"
          : type == LIkeTypeEnum.COMMENT && comment?.shares.length === 1
          ? "Share"
          : "Shares"}
      </button>
    </div>
  );
};

export default IdeaShare;
