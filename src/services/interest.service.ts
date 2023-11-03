import https from "@/utils/https";
import { IInterest, IResponse } from "./types";

const getInterests = async (): Promise<IResponse<IInterest[]>> => {
  return await https.get({
    url: "/interest",
  });
};

const queryInterests = async ({ name }: { name?: string }): Promise<IResponse<IInterest[]>> => {
  return await https.get({
    url: "/interest/query",
    query: { name },
  });
};

const interestService = {
  getInterests,
  queryInterests,
};
export default interestService;
