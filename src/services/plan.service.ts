import https from "@/utils/https";
import { ICategory, IPlan, IResponse } from "./types";

const getPlans = async (): Promise<IResponse<IPlan[]>> => {
  return await https.get({
    url: "/plan",
  });
};

const getSinglePlan = async (planId: string): Promise<IResponse<IPlan>> => {
  return await https.get({
    url: `/plan/${planId}`,
  });
};

const planService = {
  getPlans,
  getSinglePlan,
};
export default planService;
