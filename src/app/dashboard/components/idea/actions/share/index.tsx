"use client";
import ShareIcon from "@/app/assets/icons/ShareIcon";
import useToast from "@/context/toast";
import ideaService from "@/services/idea.service";
import { IComment, IIdea, LIkeTypeEnum } from "@/services/types";
import userService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiRepost } from "react-icons/bi";

interface IIdeaShare {
  isCard?: boolean;
  idea?: IIdea;
  comment?: IComment;
  type?: LIkeTypeEnum;
  viewShares: () => void;
}

const IdeaShare: React.FC<IIdeaShare> = (props) => {
  const { isCard = false, idea, comment, type = LIkeTypeEnum.IDEA, viewShares } = props;
  const [showShareButton, setShowShareButton] = useState(false);
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
      const res = await ideaService.unShare(
        idea?.id || "",
        type == LIkeTypeEnum.IDEA
          ? idea?.shares.find((l) => l.userId === currentUser?.id)?.id || ""
          : comment?.shares.find((l) => l.userId === currentUser?.id)?.id || ""
      );
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

  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (e.target !== containerRef.current && containerRef.current?.contains(e.target as Node) === false) {
        setShowShareButton(false);
      }
    };
    document?.querySelector("body")?.addEventListener("click", clickOutside);
    return () => {
      document?.querySelector("body")?.removeEventListener("click", clickOutside);
    };
  }, []);

  return (
    <div className={`flex items-center text-tib-primary  ${isCard ? " gap-1 " : " gap-2"} `}>
      {!isUserAuthor && (
        <div className=" relative">
          <ShareIcon
            onClick={() => {
              isShared ? unShareIdeaMutation.mutate() : setShowShareButton(true);
            }}
            role="button"
            className={`${isCard ? "" : "scale-125"}   ${isShared ? "text-tib-blue" : ""}`}
          />
          {showShareButton && (
            <button
              ref={containerRef}
              onClick={() => shareIdeaMutation.mutate()}
              className="absolute -bottom-2 shadow border rounded  flex items-center gap-2 bg-white min-w-max p-2 translate-y-full z-10"
            >
              <ShareIcon className=" text-tib-purple scale-125" />
              <div className="">
                <p className=" text-sm text-tib-primary text-left">Share</p>
                <p className=" text-xs text-tib-primary2 text-left">Instantly bring {idea?.user.profile?.firstName}'s post to your feed</p>
              </div>
            </button>
          )}
        </div>
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
