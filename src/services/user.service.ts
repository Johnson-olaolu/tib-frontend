import https from "@/utils/https";
import qs from "qs";
import { IProfile, IResponse, IUser } from "./types";

const getUserDetails = async (): Promise<IResponse<IUser>> => {
  return await https.get({
    url: "/user/me",
  });
};

const updateProfilePicture = async (userId: string, file: File): Promise<IResponse<IProfile>> => {
  var formData = new FormData();
  formData.append("file", file);
  return await https.updateProfile({
    url: `/user/${userId}/profilePicture`,
    body: formData,
  });
};

const updateProfile = async (
  userId: string,
  data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    interests: string[];
    bio: string;
  }
): Promise<IResponse<IProfile>> => {
  return await https.patch({
    url: `/user/${userId}/profile`,
    body: data,
  });
};

const userService = {
  getUserDetails,
  updateProfilePicture,
  updateProfile,
};

export default userService;
