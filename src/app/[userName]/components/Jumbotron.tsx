"use client";
import LightBulbIcon from "@/app/assets/icons/LightBulbIcon";
import FollowButton from "@/app/dashboard/components/user/FollowButton";
import useToast from "@/context/toast";
import { FollowStatusEnum, IFollow, IUser } from "@/services/types";
import userService from "@/services/user.service";
import walletService from "@/services/wallet.service";
import { formatAmount } from "@/utils/misc";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { FaShareFromSquare } from "react-icons/fa6";
import { FiEdit, FiEdit2, FiPenTool } from "react-icons/fi";
import { IoIosThumbsUp } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

interface IProfilePageJumbotron {
  userName: string;
}

const ProfilePageJumbotron: React.FC<IProfilePageJumbotron> = (props) => {
  const { userName } = props;
  const { openToast } = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["user", "userName", userName],
    queryFn: async () => {
      const res = await userService.queryUsers({ userName });
      return res.data![0];
    },
  });

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

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const { data: wallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const data = await walletService.fetchUserWallet(user?.id || "");
      return data.data;
    },
  });

  const isCurrentUser = useMemo(() => {
    return user?.id === currentUser?.id;
  }, [user, currentUser]);

  const [isChangingProfileImage, setIsChangingProfileImage] = useState(false);

  const selectImage = () => {
    setIsChangingProfileImage(true);
    const fileInput = document?.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", (e: any) => {
      const selectedFile: File = e.target?.files[0] || null;
      if (selectedFile) {
        userService
          .updateBackgroundPicture(user!.id, selectedFile)
          .then(() => {
            openToast({
              type: "success",
              text: "Profile Banner updated",
            });
            queryClient.invalidateQueries({ queryKey: ["user"] });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    fileInput.click();
  };
  return (
    <div className=" pb-48">
      <div
        className=" h-[500px] relative bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url("${user?.profile?.backgroundPicture || " /images/ProfileBg1.png"}")`,
        }}
      >
        {isCurrentUser && (
          <button
            onClick={() => selectImage()}
            className=" h-12 w-12 rounded-lg bg-white flex items-center justify-center absolute right-20 top-20 text-tib-blue"
          >
            <MdEdit size={24} />
          </button>
        )}
        <div className="absolute right-20 bottom-0 transform  translate-y-1/2 bg-white max-w-[1112px] min-h-80 rounded-lg w-full flex overflow-hidden gap-14 shadow-xl">
          <Image
            src={user?.profile?.profilePicture || ""}
            height={320}
            width={280}
            alt="profile picture"
            className=" bg-gray-200 rounded-lg object-cover"
          />
          <div className=" py-10 pr-10 flex-grow relative justify-between">
            <div className=" flex flex-col justify-between gap-3 ">
              <div className="  flex justify-between items-start">
                <div className="">
                  <p className=" text-tib-purple  text-2xl font-bold flex items-center">
                    {user?.profile?.firstName} {user?.profile?.lastName}
                  </p>
                  <p className=" text-tib-primary2">
                    {user?.profile?.interests.map((i, idx) => (
                      <>
                        {idx !== 0 && ", "}
                        <Link href={"#"} className="" key={i}>
                          {i}
                        </Link>
                      </>
                    ))}
                  </p>
                </div>
                {isCurrentUser ? (
                  <div className=" flex items-center gap-3">
                    <p className=" font-black text-tib-purple">
                      Bal: <br /> NGN {formatAmount(wallet?.balance || 0) || 0}
                    </p>
                    <Link href={"/dashboard/wallet/top-up"} className=" py-3 px-4 rounded border bg-tib-blue text-white">
                      Wallet
                    </Link>
                    <Link href={"/dashboard/profile"} className=" py-3 px-4 rounded border border-tib-blue text-tib-blue bg-white">
                      Edit Profile
                    </Link>
                  </div>
                ) : (
                  <FollowButton externalUser={user} variant="button" />
                )}
              </div>
              <div className=" flex-grow flex flex-col justify-center">
                <p className="text-sm text-tib-primary2">{user?.userName}</p>
                <p className=" w-[460px] mt-3 text-tib-primary line-clamp-3">{user?.profile?.bio}</p>
              </div>
              <div className=" flex gap-10  shrink-0">
                <div className=" flex flex-col gap-1">
                  <LightBulbIcon />
                  <span className="text-tib-purple text-2xl">0</span>
                  <span className="text-sm">Shared Ideas</span>
                </div>
                <div className=" flex flex-col gap-1">
                  <BiSolidUser size={10} className=" text-tib-purple" />
                  <span className="text-tib-purple text-2xl">{followData?.followers?.length || 0}</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className=" flex flex-col gap-1">
                  <BiSolidUser size={10} className=" text-tib-purple" />
                  <span className="text-tib-purple text-2xl">{followData?.following?.length || 0}</span>
                  <span className="text-sm">Following</span>
                </div>
                <div className=" flex flex-col gap-1">
                  <FaShareFromSquare size={10} className=" text-tib-purple" />
                  <span className="text-tib-purple text-2xl">0</span>
                  <span className="text-sm">Shares</span>
                </div>
                <div className=" flex flex-col gap-1">
                  <IoIosThumbsUp size={10} className=" text-tib-purple" />
                  <span className="text-tib-purple text-2xl">0</span>
                  <span className="text-sm">Likes</span>
                </div>
              </div>
            </div>
            {isCurrentUser && user!.planName !== "Free" && (
              <div className=" absolute bottom-10 right-10 flex items-center gap-3">
                <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23.9985 0.5C24.1752 0.499872 24.3494 0.541359 24.5071 0.621103C24.6647 0.700847 24.8014 0.816605 24.906 0.959L24.9885 1.0895L29.883 10.1315L29.94 10.271L29.958 10.331L29.988 10.484L29.997 10.625C29.9971 10.7264 29.9835 10.8273 29.9565 10.925L29.886 11.1125L29.829 11.216C29.8103 11.2459 29.7903 11.2749 29.769 11.303C29.7523 11.3257 29.7348 11.3477 29.7165 11.369L29.745 11.3315L27.834 13.5005C27.1869 13.0294 26.4402 12.7132 25.6515 12.5765L26.3805 11.75H21.918L16.05 26.7845C15.9675 26.9957 15.8231 27.177 15.6357 27.3047C15.4483 27.4324 15.2267 27.5004 15 27.5H14.9955C14.9489 27.5 14.9023 27.497 14.856 27.491H14.85L14.8425 27.4895C14.7902 27.4817 14.7386 27.4702 14.688 27.455L14.673 27.452C14.5813 27.4257 14.4936 27.3874 14.412 27.338L14.3985 27.3275C14.3273 27.2838 14.2618 27.2314 14.2035 27.1715L0.2685 11.3525L0.2295 11.3045L0.1695 11.216C0.0845105 11.0788 0.0302663 10.9247 0.0105 10.7645L0 10.625L0.00450003 10.526L0.024 10.3925C0.0333457 10.3488 0.0453683 10.3057 0.0599999 10.2635L0.0930001 10.175L0.135 10.0895L5.01 1.0895C5.09405 0.934187 5.21348 0.800842 5.35863 0.700254C5.50377 0.599666 5.67056 0.534661 5.8455 0.5105L5.9985 0.5H23.9985ZM19.503 11.75H10.497L14.997 23.2805L15 23.276V23.282L19.503 11.75ZM8.0835 11.75H3.6135L11.64 20.861L8.0835 11.75ZM10.4565 2.75H6.6675L3.0105 9.5H8.2965L10.4565 2.75ZM17.1765 2.75H12.819L10.6575 9.5H19.335L17.175 2.75H17.1765ZM23.3265 2.75H19.539L21.699 9.5H26.982L23.328 2.75H23.3265ZM28.5 17.75C28.5 18.7446 28.1049 19.6984 27.4016 20.4016C26.6984 21.1049 25.7446 21.5 24.75 21.5C23.7554 21.5 22.8016 21.1049 22.0984 20.4016C21.3951 19.6984 21 18.7446 21 17.75C21 16.7554 21.3951 15.8016 22.0984 15.0983C22.8016 14.3951 23.7554 14 24.75 14C25.7446 14 26.6984 14.3951 27.4016 15.0983C28.1049 15.8016 28.5 16.7554 28.5 17.75ZM31.5 25.8125C31.5 28.1465 29.571 30.5 24.75 30.5C19.929 30.5 18 28.1555 18 25.8125V25.658C18 24.188 19.191 23 20.6595 23H28.8405C30.3105 23 31.5 24.1895 31.5 25.658V25.8125Z"
                    fill="url(#paint0_linear_492_7133)"
                  />
                  <defs>
                    <linearGradient id="paint0_linear_492_7133" x1="15.75" y1="0.5" x2="15.75" y2="30.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#E1A814" />
                      <stop offset="1" stop-color="#CD7D06" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className=" font-medium text-tib-primary">Premium</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageJumbotron;
