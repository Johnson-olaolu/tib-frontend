import { INotification } from "@/services/types";
import React, { useState } from "react";
import IdeaCreatedNotification from "./idea-created-notification";
import MenuVerticalIcon from "@/app/assets/icons/MenuVerticalIcon";
import { FiTrash } from "react-icons/fi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import FollowRequestNotification from "./follow-request-notification";

interface INotificationDispatcher {
  notification?: INotification<any>;
  isModal?: boolean;
}
const NotificationDispatcher: React.FC<INotificationDispatcher> = (props) => {
  const { notification, isModal } = props;

  switch (notification?.eventType) {
    case "follow-request":
      return <FollowRequestNotification notification={notification} isModal={isModal} />;
    default:
      break;
  }
};

export default NotificationDispatcher;
