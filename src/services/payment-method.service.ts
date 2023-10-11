import https from "@/utils/https";
import { IPaymentMethod, IResponse } from "./types";

const getPaymentMethod = async (): Promise<IResponse<IPaymentMethod[]>> => {
  return await https.get({
    url: "/payment-method",
  });
};

const paymentMethodService = {
  getPaymentMethod,
};
export default paymentMethodService;
