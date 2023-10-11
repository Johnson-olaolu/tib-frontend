import https from "@/utils/https";
import { IInterest, IResponse } from "./types";

const getInterests = async (): Promise<IResponse<IInterest[]>> => {
  return await https.get({
    url: "/interest",
  });
};

const interestService = {
  getInterests,
};
export default interestService;
