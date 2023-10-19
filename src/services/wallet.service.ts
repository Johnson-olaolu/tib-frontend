import https from "@/utils/https";
import { ICreditWalletPayload, IPaymentMethod, IResponse, ITransaction, IWallet } from "./types";

const getPaymentMethods = async (): Promise<IResponse<IPaymentMethod[]>> => {
  return await https.get({
    url: "/payment-method",
  });
};

const fetchUserWallet = async (userId: string): Promise<IResponse<IWallet>> => {
  return await https.get({
    url: `/user/${userId}/wallet`,
  });
};

const creditWallet = async ({ walletId, body }: { walletId: string; body: ICreditWalletPayload }): Promise<IResponse<ITransaction>> => {
  return await https.post({
    url: `/wallet/${walletId}/creditWallet`,
    body,
  });
};

const walletService = {
  getPaymentMethods,
  fetchUserWallet,
  creditWallet,
};
export default walletService;
