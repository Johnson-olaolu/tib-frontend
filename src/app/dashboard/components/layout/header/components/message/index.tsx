"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";

const DashboardMessageNotification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div className="relative ">
      <BiMessageAltDetail size={24} role="button" onClick={() => setShowNotifications(!showNotifications)} />
      {showNotifications && (
        <div className=" absolute -bottom-7 translate-y-full w-[458px] rounded -right-12 bg-white shadow">
          <div className=" pt-7 px-6">Notification</div>
          <div className=""></div>
          <Link href={"#"} className="py-8 text-center block text-tib-blue">
            See All
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardMessageNotification;
