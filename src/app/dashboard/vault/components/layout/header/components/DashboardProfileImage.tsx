"use client";
import React, { useEffect, useRef, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { IUser } from "@/services/types";
import { getInitials } from "@/utils/misc";
import { PiPencilSimpleLight } from "react-icons/pi";
import Link from "next/link";
import { BiLogOutCircle } from "react-icons/bi";
import Avatar from "@/components/extras/Avatar";
import { useRouter } from "next13-progressbar";
import { useDispatch } from "react-redux";
import { clearStore } from "@/store/appSlice";
import userService from "@/services/user.service";

const VaultDashboardProfileImage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });
  const [showProfile, setShowProfile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutsideAvatar = (e: MouseEvent) => {
      if (e.target !== containerRef.current && containerRef.current?.contains(e.target as Node) === false) {
        setShowProfile(false);
      }
    };
    document?.querySelector("body")?.addEventListener("click", clickOutsideAvatar);
    return () => {
      document?.querySelector("body")?.removeEventListener("click", clickOutsideAvatar);
    };
  }, []);

  const onClickLogout = () => {
    dispatch(clearStore());
    queryClient.clear();
    localStorage.removeItem("TIB_STORAGE");
    router.replace("/");
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="" role="button" onClick={() => setShowProfile(!showProfile)}>
        <Avatar user={user} />
      </div>
      {showProfile && (
        <div className="absolute -bottom-3 -right-7 w-[292px] transform translate-y-full rounded overflow-hidden z-20  border border-gray-50 shadow-lg">
          <div className=" h-[72px] bg-[#EEE2FF] relative ">
            <PiPencilSimpleLight size={24} className=" right-6 bottom-4 absolute" role="button" onClick={() => router.push(`/dashboard/profile`)} />
            <div className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <Avatar user={user} size="lg" />
            </div>
          </div>
          <div className="pt-12 bg-white text-center px-11 pb-8">
            <div className=" text-center">
              <h6 className="text-[#403E3E] font-bold text-xl">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </h6>
              <p className=" text-[#59585B]">{user?.email}</p>
              <p className=" text-[#9F9EA1] text-sm">{user?.userName}</p>
            </div>

            <Link href={`/${user?.userName}`} className="mt-6 text-tib-blue font-bold text-center mx-auto inline-block mb-5">
              View Profile
            </Link>
            <div className=" h-px w-full bg-[#403E3E]"></div>
            <div className="mt-6 text-center ">
              <button onClick={() => onClickLogout()} className=" space-x-3 inline-flex items-center">
                <BiLogOutCircle size={24} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultDashboardProfileImage;
