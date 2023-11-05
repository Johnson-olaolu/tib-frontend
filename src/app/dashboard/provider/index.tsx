"use client";
import { listenForUserNotifications } from "@/services/notification.service";
import { IUser } from "@/services/types";
import userService from "@/services/user.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>(["user"]);
  useEffect(() => {
    const tornOffNotification = listenForUserNotifications(user?.id || "");
    return () => {
      tornOffNotification();
    };
  }, [user]);
  return <>{children}</>;
};

export default DashboardProvider;
