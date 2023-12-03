"use client";
import LightBulbIcon from "@/app/assets/icons/LightBulbIcon";
import categoryService from "@/services/category.service";
import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { FaShareFromSquare } from "react-icons/fa6";
import { IoIosThumbsUp } from "react-icons/io";

interface ICategoryPageJumbotron {
  categoryName: string;
}

const CategoryPageJumbotron: React.FC<ICategoryPageJumbotron> = (props) => {
  const { categoryName } = props;
  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", categoryName],
    queryFn: async () => {
      const res = await categoryService.getCategoryByName(categoryName);
      return res.data;
    },
  });

  const { data: categoryDetails } = useQuery({
    queryKey: ["category", categoryName, "categoryDetails"],
    queryFn: async () => {
      const res = await categoryService.getCategoryDetails(category?.id);
      return res.data;
    },
  });

  return (
    <div className=" pb-48">
      <div
        className=" h-[500px] relative bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url("${category?.backgroundPicture || " /images/ProfileBg1.png"}")`,
        }}
      >
        <div className="absolute right-20 bottom-0 transform  translate-y-1/2 bg-white max-w-[1112px] min-h-80 rounded-lg w-full flex overflow-hidden gap-14 shadow-xl">
          {category?.profilePicture ? (
            <Image
              src={category.profilePicture || ""}
              height={320}
              width={280}
              alt="profile picture"
              className=" bg-gray-200 rounded-lg object-cover"
            />
          ) : (
            <div className=" h-auto w-[280px] flex items-center justify-center text-2xl bg-tib-purple text-white font-bold  p-10 uppercase">
              {isLoading ? "" : categoryName}
            </div>
          )}

          <div className=" py-10 pr-10 flex-grow relative justify-between">
            <div className=" flex flex-col justify-between gap-3 ">
              <div className="  flex justify-between items-start">
                <div className="">
                  <p className=" text-tib-purple  text-2xl font-bold flex items-center">#{category?.name}</p>
                  <p className=" text-tib-primary2">{category?.description}</p>
                </div>
                {currentUser?.profile?.interests.includes(categoryName) ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="px-4 py-3 rounded bg-tib-blue text-tib-white"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className=" px-4 py-3 rounded border border-tib-blue text-tib-blue"
                  >
                    Unfollow
                  </button>
                )}
              </div>
              <div className=" flex-grow flex flex-col justify-center">
                <p className=" w-[460px] mt-3 text-tib-primary line-clamp-3">{category?.description}</p>
              </div>
              <div className=" flex gap-10  shrink-0">
                <div className=" flex flex-col gap-1">
                  <LightBulbIcon />
                  <span className="text-tib-purple text-2xl">{categoryDetails?.sharedIdeas.length}</span>
                  <span className="text-sm">Shared Ideas</span>
                </div>
                <div className=" flex flex-col gap-1">
                  <BiSolidUser size={10} className=" text-tib-purple" />
                  <span className="text-tib-purple text-2xl">{0 || 0}</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className=" flex flex-col gap-1">
                  <FaShareFromSquare size={10} className=" text-tib-purple" />
                  <span className="text-tib-purple text-2xl">{categoryDetails?.shares.length}</span>
                  <span className="text-sm">Shares</span>
                </div>
                <div className=" flex flex-col gap-1">
                  <IoIosThumbsUp size={10} className=" text-tib-purple" />
                  <span className="text-tib-purple text-2xl">{categoryDetails?.likes.length}</span>
                  <span className="text-sm">Likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPageJumbotron;
