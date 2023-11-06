import { INotification } from "@/services/types";
import React, { useState } from "react";
import IdeaCreatedNotification from "./idea-created-notification";
import MenuVerticalIcon from "@/app/assets/icons/MenuVerticalIcon";
import { FiTrash } from "react-icons/fi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import FollowRequestNotification from "./follow-request-notification";

interface INotificationDispatcher {
  notification?: INotification;
}
const NotificationDispatcher: React.FC<INotificationDispatcher> = (props) => {
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
          {<FollowRequestNotification />}
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

export default NotificationDispatcher;
