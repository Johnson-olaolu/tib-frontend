import Avatar from "@/components/extras/Avatar";
import { FollowStatusEnum, IUser } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

interface IViewFollowers {
  user?: IUser;
}

const ViewFollowers: React.FC<IViewFollowers> = (props) => {
  const { user } = props;
  const { data: followData } = useQuery({
    queryKey: ["follow", user?.id],
    queryFn: async () => {
      const res = await userService.getUserFollows({
        userId: user?.id || "",
        status: FollowStatusEnum.ACCEPTED,
      });
      return res.data;
    },
  });
  return (
    <div className=" mt-20">
      {followData && followData.followers.length > 0 ? (
        <div className="flex gap-12">
          {followData.followers.map((follow) => (
            <Link href={`/${follow.follower.userName}`} className=" flex flex-col items-center gap-3" key={follow.follower.id}>
              <Avatar size="xl" user={follow.follower} />
              <div className=" text-center">
                <p className=" text-sm text-tib-purple">
                  {follow.follower.profile?.firstName} {follow.follower.profile?.lastName}
                </p>
                <p className=" text-xs text-tib-primary2 w-24 text-center">
                  {follow.follower.profile?.interests.map((interest, idx) => (
                    <>
                      {idx !== 0 && ", "}
                      <Link href={"#"} className="">
                        {interest}
                      </Link>
                    </>
                  ))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className=" text-center">
          <p className=" text-tib-primary py-3"> No Followers Found</p>
        </div>
      )}
    </div>
  );
};

export default ViewFollowers;
