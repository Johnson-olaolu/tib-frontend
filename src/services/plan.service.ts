import https from "@/utils/https";
import { ICategory, IPlan, IResponse } from "./types";

const getPlans = async (): Promise<IResponse<IPlan[]>> => {
  return await https.get({
    url: "/plan",
  });
};

const planService = {
  getPlans,
};
export default planService;
