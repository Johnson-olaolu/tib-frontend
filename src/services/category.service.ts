import https from "@/utils/https";
import { ICategory, IIdea, ILike, IResponse, IShare, IUser } from "./types";

const getCategories = async (): Promise<IResponse<ICategory[]>> => {
  return await https.get({
    url: "/category",
  });
};
const getCategoryByName = async (name?: string): Promise<IResponse<ICategory>> => {
  return await https.get({
    url: "/category/name",
    query: { name },
  });
};

const getCategoryFollowers = async (id?: string): Promise<IResponse<IUser[]>> => {
  return await https.get({
    url: `/category/${id}/followers`,
  });
};

const getCategoryDetails = async (
  id?: string
): Promise<
  IResponse<{
    likes: ILike[];
    sharedIdeas: IIdea[];
    likedIdeas: IIdea[];
    shares: IShare[];
    mostViewed: IIdea[];
  }>
> => {
  return await https.get({
    url: `/category/${id}/idea-details`,
  });
};

const queryCategories = async ({ name }: { name?: string }): Promise<IResponse<ICategory[]>> => {
  return await https.get({
    url: "/category/query",
    query: { name },
  });
};

const categoryService = {
  getCategories,
  queryCategories,
  getCategoryByName,
  getCategoryDetails,
  getCategoryFollowers,
};
export default categoryService;
