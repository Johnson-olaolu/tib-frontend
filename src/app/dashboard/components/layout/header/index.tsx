import Image from "next/image";
import React from "react";
import DashboardSearchBar from "./components/DashboardSearchBar";
import Link from "next/link";
import DashboardMessageNotification from "./components/message";
import DashboardNotificationNotification from "./components/notification";
import DashboardProfileImage from "./components/DashboardProfileImage";

const DashbaordHeader = () => {
  return (
    <header className="  py-7 px-12 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-32">
          <Image src="/images/logo.png" height={54} width={200} alt="TIB Logo" />
          <DashboardSearchBar />
        </div>
        <div className=" flex items-center gap-8">
          <div className="flex gap-3">
            <Link href={"/dashboard/idea/create"} className=" py-3 px-4 rounded border border-tib-blue text-tib-blue bg-white">
              Share Idea
            </Link>
            <Link href={"#"} className=" py-3 px-4 rounded border bg-tib-blue text-white">
              Access Vault
            </Link>
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
