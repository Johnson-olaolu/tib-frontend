import React from "react";

const FollowRequestNotification = () => {
  return (
    <div className=" flex  items-start justify-between">
      <div className="">
        <div className="flex items-center gap-2">
          <div className=" bg-tib-purple h-12 w-12 rounded-full"></div>
          <div className=" space-y-1">
            <p className=" text-lg font-bold text-tib-purple">Dina Wong</p>
            <p className=" font-bold text-tib-primary2">Arts</p>
          </div>
        </div>
        <div className="mt-3 pl-14">
          <p className=" text-tib-primary text-sm">Wants to follow you</p>
          <span className=" capitalize mt-3 inline-block text-[10px] text-tib-primary2">2 Hours Ago</span>
        </div>
      </div>
      <div className=" flex gap-3  pt-4">
        <button className=" py-3 px-4 rounded border bg-tib-blue text-white">Accept</button>
        <button className=" py-3 px-4 rounded border border-tib-blue text-tib-blue">Ignore</button>
      </div>
    </div>
  );
};

export default FollowRequestNotification;
