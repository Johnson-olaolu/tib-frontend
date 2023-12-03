"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import VaultDashboardSearchBar from "./components/DashboardSearchBar";
import VaultDashboardMessageNotification from "./components/message";
import VaultDashboardNotificationNotification from "./components/notification";
import VaultDashboardProfileImage from "./components/DashboardProfileImage";
import { useRouter } from "next13-progressbar";
import useModal from "@/context/modal";

const VaultDashboardHeader = () => {
  const { openModal } = useModal();
  const router = useRouter();
  const onClickSwitchToBasic = () => {
    router.push("/dashboard/home");
  };

  const onClickDepositIdea = () => {
    openModal("vault-create-idea");
  };
  return (
    <header className="  py-7 px-12 bg-white">
      <div className="flex items-center justify-between">
        <Link href={"/dashboard/vault/home"}>
          <Image src="/images/logo.png" height={54} width={200} alt="TIB Logo" />
        </Link>

        <VaultDashboardSearchBar />
        <div className=" flex items-center gap-8">
          <div className="flex gap-3">
            <button onClick={() => onClickDepositIdea()} className=" py-3 px-4 rounded border border-tib-blue text-tib-blue bg-white">
              Deposit Idea
            </button>
            <button onClick={() => onClickSwitchToBasic()} className=" py-3 px-4 rounded border bg-tib-blue text-white">
              Switch to Basic
            </button>
          </div>
          <div className=" flex items-center gap-4">
            <VaultDashboardMessageNotification />
            <VaultDashboardNotificationNotification />
          </div>
          <VaultDashboardProfileImage />
        </div>
      </div>
    </header>
  );
};

export default VaultDashboardHeader;
