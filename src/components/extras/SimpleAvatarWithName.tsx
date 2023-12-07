"use client";
import React from "react";
import Avatar from "./Avatar";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";

interface ISimpleAvatarWithName {
  userId: string;
}

const SimpleAvatarWithName: React.FC<ISimpleAvatarWithName> = ({ userId }) => {
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await userService.findOneUser(userId);
      return res.data;
    },
  });
  return (
    <Link href={`/${user?.userName}`} className=" flex items-center gap-3">
      <GoDotFill className=" text-tib-primary" />
      <Avatar size="sm" user={user} />
      <p className=" text-tib-primary  text-lg font-bold flex items-center">
        {user?.profile?.firstName} {user?.profile?.lastName}
      </p>
    </Link>
  );
};

export default SimpleAvatarWithName;
