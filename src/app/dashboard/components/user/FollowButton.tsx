"use client";
import useToast from "@/context/toast";
import { FollowStatusEnum, IFollow, IUser } from "@/services/types";
import userService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

interface IFollowButton {
  externalUser?: IUser;
  variant?: "text" | "button";
}

const FollowButton: React.FC<IFollowButton> = (props) => {
  const { openToast } = useToast();
  const { externalUser, variant = "text" } = props;
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const { data: isFollowing, isFetching } = useQuery({
    queryKey: ["follow", externalUser?.id, user?.id],
    queryFn: async () => {
      const res = await userService.checkIsFollowing(externalUser?.id || "", user?.id || "");
      return res.data;
    },
  });

  const followUserMutation = useMutation({
    mutationFn: userService.followUser,
    onSuccess: (data) => {
      openToast({
        title: "Follow request Sent Successfully",
        text: data.message,
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["follow", externalUser?.id] });
    },
  });

  const unfollowUserMutation = useMutation({
    mutationFn: userService.unFollowUser,
    onSuccess: (data) => {
      openToast({
        title: "UnFollowed User",
        text: "User Unfollowed successfully",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["follow", externalUser?.id] });
    },
  });

  if (externalUser?.id === user?.id || isFetching) {
    return <></>;
  }
  if (isFollowing) {
    return (isFollowing as unknown as IFollow).status == FollowStatusEnum.PENDING ? (
      <span className=" text-tib-blue">Pending</span>
    ) : variant == "text" ? (
      <button
        className=" text-tib-blue"
        onClick={(e) => {
          e.preventDefault();
          unfollowUserMutation.mutate({ followerId: user?.id || "", userId: externalUser?.id || "" });
        }}
      >
        UnFollow
      </button>
    ) : (
      <button
        onClick={(e) => {
          e.preventDefault();
          unfollowUserMutation.mutate({ followerId: user?.id || "", userId: externalUser?.id || "" });
        }}
        className=" px-4 py-3 rounded border border-tib-blue text-tib-blue"
      >
        Unfollow
      </button>
    );
  } else {
    return variant == "text" ? (
      <button
        className=" text-tib-blue"
        onClick={(e) => {
          e.preventDefault();
          followUserMutation.mutate({ followerId: user?.id || "", userId: externalUser?.id || "" });
        }}
      >
        Follow
      </button>
    ) : (
      <button
        onClick={(e) => {
          e.preventDefault();
          followUserMutation.mutate({ followerId: user?.id || "", userId: externalUser?.id || "" });
        }}
        className="px-4 py-3 rounded bg-tib-blue text-tib-white"
      >
        Follow
      </button>
    );
  }
};

export default FollowButton;