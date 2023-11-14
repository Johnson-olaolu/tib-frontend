import MenuVerticalIcon from "@/app/assets/icons/MenuVerticalIcon";
import Avatar from "@/components/extras/Avatar";
import useToast from "@/context/toast";
import notificationService from "@/services/notification.service";
import { FollowStatusEnum, IFollow, INotification } from "@/services/types";
import userService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

interface INotificationDispatcher {
  notification?: INotification<IFollow>;
  isModal?: boolean;
}
const FollowRequestAcceptedNotification: React.FC<INotificationDispatcher> = (props) => {
  const { openToast } = useToast();
  const queryClient = useQueryClient();
  const { notification, isModal = false } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [showExtraMenu, setShowExtraMenu] = useState(false);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await userService.getUserDetails();
      return res.data;
    },
  });

  const handleOnHover = () => {
    setIsHovered(true);
  };

  const handleOnLeave = () => {
    setIsHovered(false);
    setShowExtraMenu(false);
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["follow", notification?.data.user.id],
    });
    queryClient.invalidateQueries({
      queryKey: ["follow", notification?.data.follower.id],
    });
  }, [notification, queryClient]);

  if (isModal) {
    return (
      <div
        onMouseEnter={() => handleOnHover()}
        onMouseLeave={() => handleOnLeave()}
        className="pt-8 pb-1 px-6 hover:bg-tib-blue hover:bg-opacity-10 rounded"
      >
        <div className=" relative pr-10">
          {!notification?.seen && (
            <svg className=" absolute -left-3 top-3" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="3.22844" cy="4.00005" r="3.22844" fill="#406EFF" />
            </svg>
          )}

          <div className=" flex  items-start justify-between">
            <div className="">
              <div className="flex items-center gap-2">
                <Link href={`/${notification?.data.user.userName}`}>
                  <Avatar user={notification?.data.user} size="xs" />
                </Link>
                <div className=" space-y-1">
                  <Link href={`/${notification?.data.user.userName}`} className=" text-lg font-bold text-tib-purple">
                    {(notification?.data as IFollow).user.profile?.firstName
                      ? `${(notification?.data as IFollow).user.profile?.firstName} ${(notification?.data as IFollow).user.profile?.lastName}`
                      : `${(notification?.data as IFollow).user.userName}`}
                  </Link>
                  <p className=" font-bold text-tib-primary2 text-xs">{(notification?.data as IFollow).user.profile?.interests.join(", ")}</p>
                </div>
              </div>
              <div className="mt-1 pl-10">
                <p className=" text-tib-primary text-sm">Accepted Your Follow Request</p>
                <span className=" capitalize mt-3 inline-block text-[10px] text-tib-primary2">{moment(notification?.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>
          {isHovered && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <MenuVerticalIcon className="" role="button" onClick={() => setShowExtraMenu(!showExtraMenu)} />
              {showExtraMenu && (
                <div className=" absolute -bottom-4 right-0 transform translate-y-full bg-white rounded-sm shadow-md  min-w-max p-4 space-y-4">
                  <button
                    onClick={() => notificationService.deleteNotification(notification?.id || "")}
                    className="flex items-center text-tib-red gap-3"
                  >
                    <FiTrash />
                    <span className="text-sm">Delete Notification</span>
                  </button>
                  <button
                    onClick={() => notificationService.deleteNotification(notification?.id || "")}
                    className="flex items-center text-tib-primary gap-3"
                  >
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
  }
  return (
    <div
      onMouseEnter={() => handleOnHover()}
      onMouseLeave={() => handleOnLeave()}
      className={`pt-14 pb-4 px-12 hover:bg-tib-blue hover:bg-opacity-10 rounded`}
    >
      <div className=" relative pr-16">
        {!notification?.seen && (
          <svg className=" absolute -left-4 top-6" width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="3.22844" cy="4.00005" r="3.22844" fill="#406EFF" />
          </svg>
        )}

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
              <p className=" text-tib-primary text-sm">Accepted Your follow Request</p>
              <span className=" capitalize mt-3 inline-block text-[10px] text-tib-primary2">{moment(notification?.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
        {isHovered && (
          <div className="absolute right-0 top-0">
            <MenuVerticalIcon className="" role="button" onClick={() => setShowExtraMenu(!showExtraMenu)} />
            {showExtraMenu && (
              <div className=" absolute -bottom-4 right-0 transform translate-y-full bg-white rounded-sm shadow-md  min-w-max p-4 space-y-4">
                <button
                  onClick={() => notificationService.deleteNotification(notification?.id || "")}
                  className="flex items-center text-tib-red gap-3"
                >
                  <FiTrash />
                  <span className="text-sm">Delete Notification</span>
                </button>
                <button
                  onClick={() => notificationService.deleteNotification(notification?.id || "")}
                  className="flex items-center text-tib-primary gap-3"
                >
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

export default FollowRequestAcceptedNotification;
