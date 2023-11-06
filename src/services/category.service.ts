import https from "@/utils/https";
import { ICategory, IResponse } from "./types";

const getCategories = async (): Promise<IResponse<ICategory[]>> => {
  return await https.get({
    url: "/category",
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
};
export default categoryService;
