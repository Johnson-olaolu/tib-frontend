"use client";
import React from "react";
import Avatar from "./Avatar";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

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
    <Link href={`/${user?.userName}`} className=" flex items-center gap-4">
      <Avatar size="sm" user={user} />
      <p className=" text-tib-purple  text-lg font-bold flex items-center">
        {user?.profile?.firstName} {user?.profile?.lastName}
      </p>
    </Link>
  );
};

export default SimpleAvatarWithName;
