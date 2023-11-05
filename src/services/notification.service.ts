import { io, connect } from "socket.io-client";

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
    notificationSocket.on(userId, (data) => {
      console.log(data);
    });
  });

  return () => {
    notificationSocket.off();
  };
};
