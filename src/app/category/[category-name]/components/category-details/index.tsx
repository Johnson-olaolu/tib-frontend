"use client";
import { FollowStatusEnum } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ViewSimilarFollowers from "./ViewSimilarFollowers";
import ViewCategoryFollowers from "./ViewFollowers";
import ViewFollowing from "./ViewFollowing";
import ViewCategoryShares from "./ViewShares";
import ViewCategoryLikes from "./ViewLikes";
import categoryService from "@/services/category.service";

interface ICategoryDetails {
  categoryName: string;
}

const categoryDetailsMenu = ["SIMILAR FOLLOWERS", "FOLLOWERS", "SHARES", "LIKES"] as const;

const CategoryDetails: React.FC<ICategoryDetails> = (props) => {
  const { categoryName } = props;

  const [activeMenu, setActiveMenu] = useState<(typeof categoryDetailsMenu)[number]>();
  const [userDetailsMenu2, setUserDetailsMenu2] = useState<typeof categoryDetailsMenu>([...categoryDetailsMenu]);

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", categoryName],
    queryFn: async () => {
      const res = await categoryService.getCategoryByName(categoryName);
      return res.data;
    },
  });

  console.log(category);

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
          <ViewSimilarFollowers category={category} />
        ) : activeMenu == "FOLLOWERS" ? (
          <ViewCategoryFollowers category={category} />
        ) : activeMenu == "SHARES" ? (
          <ViewCategoryShares category={category} />
        ) : (
          <ViewCategoryLikes category={category} />
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
