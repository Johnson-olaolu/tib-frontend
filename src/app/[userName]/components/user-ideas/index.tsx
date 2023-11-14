"use client";
import ViewIdeas from "@/app/dashboard/components/idea";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IUserDetails {
  userName: string;
}

const UserIdeas: React.FC<IUserDetails> = (props) => {
  const { userName } = props;

  const { data: user } = useQuery({
    queryKey: ["user", "userName", userName],
    queryFn: async () => {
      const res = await userService.queryUsers({ userName });
      return res.data![0];
    },
  });
  return (
    <div className="max-w-7xl mx-auto mt-32">
      <ViewIdeas title={`Ideas shared by ${user?.profile?.firstName} ${user?.profile?.lastName}`} query={{ user: user?.id }} />
    </div>
  );
};

export default UserIdeas;
