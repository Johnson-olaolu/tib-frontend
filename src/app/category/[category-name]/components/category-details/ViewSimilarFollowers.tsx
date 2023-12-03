import Avatar from "@/components/extras/Avatar";
import categoryService from "@/services/category.service";
import { FollowStatusEnum, ICategory, IUser } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useMemo } from "react";

interface IViewFollowers {
  category?: ICategory;
}

const ViewSimilarFollowers: React.FC<IViewFollowers> = (props) => {
  const { category } = props;

  const { data: categoryFollowers } = useQuery({
    queryKey: ["category", category?.name, "followers"],
    queryFn: async () => {
      const res = await categoryService.getCategoryFollowers(category?.id);
      return res.data;
    },
  });

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const { data: currentUserfollowData } = useQuery({
    queryKey: ["follow", currentUser?.id],
    queryFn: async () => {
      const res = await userService.getUserFollows({
        userId: currentUser?.id || "",
        status: FollowStatusEnum.ACCEPTED,
      });
      return res.data;
    },
  });

  const similarFollowers = useMemo(() => {
    return categoryFollowers?.filter((follower) => currentUserfollowData?.followers.findIndex((f) => f.follower.id == follower.id) !== -1);
  }, [categoryFollowers, currentUserfollowData?.followers]);
  return (
    <div className=" mt-20">
      {similarFollowers && similarFollowers.length > 0 ? (
        <div className="flex gap-12">
          {similarFollowers.map((follow) => (
            <Link href={`/${follow.userName}`} className=" flex flex-col items-center gap-3" key={follow.id}>
              <Avatar size="xl" user={follow} />
              <div className=" text-center">
                <p className=" text-sm text-tib-purple">
                  {follow.profile?.firstName} {follow.profile?.lastName}
                </p>
                <p className=" text-xs text-tib-primary2 w-24 text-center">
                  {follow.profile?.interests.map((interest, idx) => (
                    <>
                      {idx !== 0 && ", "}
                      <Link href={`/category/${interest}`} className=" hover:underline">
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
          <p className=" text-tib-primary py-3"> No Similar Followers Found</p>
        </div>
      )}
    </div>
  );
};

export default ViewSimilarFollowers;
