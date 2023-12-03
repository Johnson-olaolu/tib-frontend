"use client";
import { Notification } from "@/app/dashboard/components/notification";
import { RootState } from "@/store/appSlice";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiBell, BiMessageAltDetail } from "react-icons/bi";
import { useSelector } from "react-redux";

const VaultDashboardNotificationNotification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const notifications = useSelector((state: RootState) => state.notification.notifications);
  useEffect(() => {
    const clickOutsideSelectSearch = (e: MouseEvent) => {
      if (e.target !== containerRef.current && containerRef.current?.contains(e.target as Node) === false) {
        setShowNotifications(false);
      }
    };
    document?.querySelector("body")?.addEventListener("click", clickOutsideSelectSearch);
    return () => {
      document?.querySelector("body")?.removeEventListener("click", clickOutsideSelectSearch);
    };
  }, []);
  return (
    <div className="relative " ref={containerRef}>
      <div className=" relative">
        <BiBell size={24} role="button" onClick={() => setShowNotifications(!showNotifications)} />
        {notifications && notifications?.length > 0 && (
          <span className="absolute right-[2px] top-[2px] rounded-full p-[1px] bg-tib-white">
            <svg width="8" height="8" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.4165 8.5C6.62564 8.5 8.4165 6.70914 8.4165 4.5C8.4165 2.29086 6.62564 0.5 4.4165 0.5C2.20736 0.5 0.416504 2.29086 0.416504 4.5C0.416504 6.70914 2.20736 8.5 4.4165 8.5Z"
                fill="#C90D0D"
              />
            </svg>
          </span>
        )}
      </div>
      {showNotifications && (
        <div className=" absolute -bottom-7 translate-y-full w-[458px] rounded -right-12 bg-white shadow-lg border border-gray-50 z-20">
          <div className=" pt-7 pb-3 px-6 flex-shrink-0">Notification</div>
          {notifications && notifications.length > 0 ? (
            <div className=" flex-grow flex flex-col h-[458px]">
              <div className="flex-grow overflow-auto">
                {notifications?.map((n) => (
                  <Notification key={n.id} notification={n} isModal />
                ))}
              </div>
              <Link href={"/dashboard/notification"} className="py-8 text-center block text-tib-blue shadow-lg">
                See All
              </Link>
            </div>
          ) : (
            <div className=" flex justify-center items-center h-[458px] ">
              <p className=" text-sm  text-tib-primary w-36 text-center">No Notification at the moment</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VaultDashboardNotificationNotification;
