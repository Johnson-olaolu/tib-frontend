import { io, connect } from "socket.io-client";
import { INotification } from "./types";
import { store } from "@/store";
import { saveNotification } from "@/store/notificationSlice";

const baseURL = process.env.NEXT_PUBLIC_NOTIFICATION_URL;
export const listenForUserNotifications = (userId: string) => {
  console.log({ userId });
  const notificationSocket = connect(`${baseURL}/notification`, {
    query: {
      userId,
    },
  });
  notificationSocket.on("connect", () => {
    console.log(notificationSocket.id);
    notificationSocket.on(userId, (data: INotification[]) => {
      console.log({ notifications: data});
      store.dispatch(saveNotification({ notifications: data }));
    });
  });

  return () => {
    notificationSocket.off();
  };
};
