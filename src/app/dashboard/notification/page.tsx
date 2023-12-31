"use client";
import BackButton from "@/components/extras/BackButton";
import React, { useState } from "react";
import { Notification } from "../components/notification";

const DashboardNotification = () => {
  const [view, setView] = useState<"All" | "Follow Requests">("All");
  return (
    <main className="">
      <BackButton />
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className=" font-bold text-3xl text-tib-purple">Notifications</h1>
        </div>
        <nav className=" mt-14 flex justify-center">
          <ul className="flex gap-4 text-xl ">
            <li
              role="button"
              onClick={() => setView("All")}
              className={` px-4 py-3 rounded flex items-center gap-2 ${
                view == "All" ? " text-tib-white bg-tib-blue font-medium" : "text-tib-primary2"
              }`}
            >
              All
            </li>
            <li
              role="button"
              onClick={() => setView("Follow Requests")}
              className={` px-4 py-3 rounded flex items-center gap-2 ${
                view == "Follow Requests" ? " text-tib-white bg-tib-blue font-medium" : "text-tib-primary2"
              }`}
            >
              Follow Request
              {view !== "Follow Requests" && (
                <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3.22844" cy="4.00005" r="3.22844" fill="#406EFF" />
                </svg>
              )}
            </li>
          </ul>
        </nav>
        <div className=" mt-8"></div>
        <Notification />
      </div>
    </main>
  );
};

export default DashboardNotification;
