"use client";
import Image from "next/image";
import React from "react";
import DashboardSearchBar from "./components/DashboardSearchBar";
import Link from "next/link";
import DashboardMessageNotification from "./components/message";
import DashboardNotificationNotification from "./components/notification";
import DashboardProfileImage from "./components/DashboardProfileImage";
import { useQuery } from "@tanstack/react-query";
import userService from "@/services/user.service";
import { useRouter } from "next13-progressbar";

const DashbaordHeader = () => {
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const onClickAccessVault = () => {
    // router.push(`/dashboard/vault/home`);

    if (user?.planName === "Free") {
      router.push(`/dashboard/vault/access-vault`);
    } else {
      router.push(`/dashboard/vault/home`);
    }
  };
  return (
    <header className="  py-7 px-12 bg-white">
      <div className="flex items-center justify-between">
        <Link href={"/dashboard/home"}>
          <Image src="/images/logo.png" height={54} width={200} alt="TIB Logo" />
        </Link>

        <DashboardSearchBar />
        <div className=" flex items-center gap-8">
          <div className="flex gap-3">
            <Link href={"/dashboard/idea/create"} className=" py-3 px-4 rounded border border-tib-blue text-tib-blue bg-white">
              Share Idea
            </Link>
            <button onClick={() => onClickAccessVault()} className=" py-3 px-4 rounded border bg-tib-blue text-white">
              Access Vault
            </button>
          </div>
          <div className=" flex items-center gap-4">
            <DashboardMessageNotification />
            <DashboardNotificationNotification />
          </div>
          <DashboardProfileImage />
        </div>
      </div>
    </header>
  );
};

export default DashbaordHeader;
