import https from "@/utils/https";
import qs from "qs";
import { IProfile, IResponse, IUser } from "./types";

const getUserDetails = async (): Promise<IResponse<IUser>> => {
  return await https.get({
    url: "/user/me",
  });
};

const queryUsers = async (query: {
  role?: string;
  plan?: string;
  userName?: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
}): Promise<IResponse<IUser[]>> => {
  return await https.get({
    url: "/user/query",
    query: query,
  });
};

const updateProfilePicture = async (userId: string, file: File): Promise<IResponse<IProfile>> => {
  var formData = new FormData();
  formData.append("file", file);
  return await https.patchForm({
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
  queryUsers,
};

export default userService;
