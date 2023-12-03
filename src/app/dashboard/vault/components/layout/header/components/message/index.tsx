"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";

const VaultDashboardMessageNotification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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
      <BiMessageAltDetail size={24} role="button" onClick={() => setShowNotifications(!showNotifications)} />
      {showNotifications && (
        <div className=" absolute -bottom-7 translate-y-full w-[458px] rounded -right-12 bg-white shadow-lg border-gray-50 border">
          <div className=" pt-7 px-6">Message</div>
          <div className=""></div>
          <Link href={"#"} className="py-8 text-center block text-tib-blue">
            See All
          </Link>
        </div>
      )}
    </div>
  );
};

export default VaultDashboardMessageNotification;
