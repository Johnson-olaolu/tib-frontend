import https from "@/utils/https";
import qs from "qs";
import { FollowStatusEnum, IFollow, IProfile, IResponse, IUser } from "./types";

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

const updateBackgroundPicture = async (userId: string, file: File): Promise<IResponse<IProfile>> => {
  var formData = new FormData();
  formData.append("file", file);
  return await https.patchForm({
    url: `/user/${userId}/backgroundPicture`,
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

const checkIsFollowing = async (userId: string, followerId: string): Promise<IResponse<false | IFollow>> => {
  return await https.get({
    url: `/user/${followerId}/follow/check`,
    query: { userId },
  });
};

const followUser = async ({ userId, followerId }: { userId: string; followerId: string }): Promise<IResponse<IFollow>> => {
  return await https.post({
    url: `/user/${followerId}/follow`,
    body: { userId },
  });
};

const getUserFollows = async ({
  userId,
  status,
}: {
  userId: string;
  status: FollowStatusEnum;
}): Promise<
  IResponse<{
    followers: IFollow[];
    following: IFollow[];
  }>
> => {
  return await https.get({
    url: `/user/${userId}/follow`,
    query: { status },
  });
};
const unFollowUser = async ({ userId, followerId }: { userId: string; followerId: string }): Promise<IResponse<IFollow>> => {
  return await https.post({
    url: `/user/${followerId}/unfollow`,
    body: { userId },
  });
};

const handleFollowRequest = async ({
  userId,
  followRequestId,
  status,
}: {
  userId: string;
  followRequestId: string;
  status: FollowStatusEnum;
}): Promise<IResponse<IFollow>> => {
  return await https.post({
    url: `/user/${userId}/follow/${followRequestId}/handle`,
    body: { status },
  });
};

const userService = {
  getUserDetails,
  updateProfilePicture,
  updateProfile,
  queryUsers,
  checkIsFollowing,
  followUser,
  getUserFollows,
  unFollowUser,
  handleFollowRequest,
  updateBackgroundPicture,
};

export default userService;
