import { io, connect } from "socket.io-client";
import { INotification } from "./types";
import { store } from "@/store";
import { saveNotification } from "@/store/notificationSlice";

const baseURL = process.env.NEXT_PUBLIC_NOTIFICATION_URL;
export const listenForUserNotifications = (userId: string) => {
  const notificationSocket = connect(`${baseURL}/notification`, {
    query: {
      userId,
    },
  });
  notificationSocket.on("connect", () => {
    notificationSocket.on(userId, (data: INotification[]) => {
      store.dispatch(saveNotification({ notifications: data }));
    });
  });

  return () => {
    notificationSocket.off();
  };
};
