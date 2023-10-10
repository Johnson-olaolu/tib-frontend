import https from "@/utils/https";
import { IResponse, IUser } from "./types";

const getUserDetails = async (): Promise<IResponse<IUser>> => {
  return await https.get({
    url: "/user/me",
  });
};

const userService = {
  getUserDetails,
};

export default userService;
