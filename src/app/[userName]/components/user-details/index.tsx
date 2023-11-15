"use client";
import { FollowStatusEnum } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ViewSimilarFollowers from "./ViewSimilarFollowers";
import ViewFollowers from "./ViewFollowers";
import ViewFollowing from "./ViewFollowing";
import ViewShares from "./ViewShares";
import ViewLikes from "./ViewLikes";

interface IUserDetails {
  userName: string;
}

const userDetailsMenu = ["SIMILAR FOLLOWERS", "FOLLOWERS", "FOLLOWING", "SHARES", "LIKES"] as const;

const UserDetails: React.FC<IUserDetails> = (props) => {
  const { userName } = props;

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const { data: user } = useQuery({
    queryKey: ["user", "userName", userName],
    queryFn: async () => {
      const res = await userService.queryUsers({ userName });
      return res.data![0];
    },
  });

  const [activeMenu, setActiveMenu] = useState<(typeof userDetailsMenu)[number]>();
  const [userDetailsMenu2, setUserDetailsMenu2] = useState<typeof userDetailsMenu>();

  useEffect(() => {
    if (currentUser?.id == user?.id) {
      setUserDetailsMenu2([...userDetailsMenu.slice(1)] as any);
      setActiveMenu("FOLLOWERS");
    } else {
      setUserDetailsMenu2([...userDetailsMenu]);
      setActiveMenu("SIMILAR FOLLOWERS");
    }
  }, [currentUser, user]);

  return (
    <div className="max-w-7xl mx-auto mt-32">
      <nav className=" border-b border-[#E8E3E3]">
        <ul className=" w-full flex items-center gap-32 justify-center">
          {userDetailsMenu2?.map((menuItem) => (
            <li
              role="button"
              key={menuItem}
              onClick={() => setActiveMenu(menuItem)}
              className={` py-5 font-bold  text-xl ${activeMenu == menuItem ? " text-tib-blue" : "text-tib-purple"}`}
            >
              {menuItem}
            </li>
          ))}
        </ul>
      </nav>
      <div className="">
        {activeMenu == "SIMILAR FOLLOWERS" ? (
          <ViewSimilarFollowers user={user} />
        ) : activeMenu == "FOLLOWERS" ? (
          <ViewFollowers user={user} />
        ) : activeMenu == "FOLLOWING" ? (
          <ViewFollowing />
        ) : activeMenu == "SHARES" ? (
          <ViewShares />
        ) : (
          <ViewLikes />
        )}
      </div>
    </div>
  );
};

export default UserDetails;
