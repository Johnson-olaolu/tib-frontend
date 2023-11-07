import MenuVerticalIcon from "@/app/assets/icons/MenuVerticalIcon";
import Avatar from "@/components/extras/Avatar";
import { IFollow, INotification } from "@/services/types";
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

interface INotificationDispatcher {
  notification?: INotification;
}
const FollowRequestNotification: React.FC<INotificationDispatcher> = (props) => {
  const { notification } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [showExtraMenu, setShowExtraMenu] = useState(false);
  const handleOnHover = () => {
    setIsHovered(true);
  };

  const handleOnLeave = () => {
    setIsHovered(false);
    setShowExtraMenu(false);
  };
  return (
    <div
      onMouseEnter={() => handleOnHover()}
      onMouseLeave={() => handleOnLeave()}
      className="pt-14 pb-4 px-12 hover:bg-tib-blue hover:bg-opacity-10 rounded"
    >
      <div className=" relative pr-16">
        <svg className=" absolute -left-4 top-6" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="3.22844" cy="4.00005" r="3.22844" fill="#406EFF" />
        </svg>
        <div className=" relative pr-16">
          <svg className=" absolute -left-4 top-6" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3.22844" cy="4.00005" r="3.22844" fill="#406EFF" />
          </svg>
          <div className=" flex  items-start justify-between">
            <div className="">
              <div className="flex items-center gap-2">
                <Avatar user={(notification?.data as IFollow).user} />
                <div className=" space-y-1">
                  <p className=" text-lg font-bold text-tib-purple">
                    {(notification?.data as IFollow).user.profile?.firstName
                      ? `${(notification?.data as IFollow).user.profile?.firstName} ${(notification?.data as IFollow).user.profile?.lastName}`
                      : `${(notification?.data as IFollow).user.userName}`}
                  </p>
                  <p className=" font-bold text-tib-primary2">{(notification?.data as IFollow).user.profile?.interests.join(", ")}</p>
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
        </div>
        {isHovered && (
          <div className="absolute right-0 top-0">
            <MenuVerticalIcon className="" role="button" onClick={() => setShowExtraMenu(!showExtraMenu)} />
            {showExtraMenu && (
              <div className=" absolute -bottom-4 right-0 transform translate-y-full bg-white rounded-sm shadow-md  min-w-max p-4 space-y-4">
                <button className="flex items-center text-tib-red gap-3">
                  <FiTrash />
                  <span className="text-sm">Delete Notification</span>
                </button>
                <button className="flex items-center text-tib-primary gap-3">
                  <MdOutlineReportGmailerrorred />
                  <span className="text-sm">Report Notification</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowRequestNotification;
