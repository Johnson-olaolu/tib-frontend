/* eslint-disable react-hooks/rules-of-hooks */
import Avatar from "@/components/extras/Avatar";
import { IUser } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

interface ICollaborators {
  collaborators?: string[];
}

const Collaborators: React.FC<ICollaborators> = (props) => {
  const { collaborators } = props;

  useEffect(() => {}, []);
  return (
    <div className=" py-16" style={{ background: "rgba(64, 110, 255, 0.08)" }}>
      <div className="max-w-7xl flex flex-col items-center">
        <div className="text-center space-y-4">
          <h6 className=" text-lg font-bold text-tib-purple">Collaborators</h6>
          <p className=" text-tib-primary2">In the course of this idea actulaization I worked head to head with the following people:</p>
        </div>

        <ul className="list-disc flex items-center flex-wrap justify-center gap-6 mt-9">
          {collaborators?.map((collaborator) => (
            <SingleCollaborator key={collaborator} userId={collaborator} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const SingleCollaborator: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await userService.findOneUser(userId);
      return res.data;
    },
  });
  return (
    <li className="">
      <div className=" flex items-center gap-4">
        <Avatar size="sm" user={user} />
        <p className=" text-tib-purple  text-lg font-bold flex items-center">
          {user?.profile?.firstName} {user?.profile?.lastName}
        </p>
      </div>
    </li>
  );
};

export default Collaborators;
