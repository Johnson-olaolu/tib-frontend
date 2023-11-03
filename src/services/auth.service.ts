import https from "@/utils/https";
import { ILoginPayLoad, ILoginResponse, IRegisterPayLoad, IResetPasswordPayload, IResponse } from "./types";

const register = async (payload: IRegisterPayLoad): Promise<IResponse<ILoginResponse>> => {
  return await https.post({
    url: "/auth/register",
    body: JSON.stringify(payload),
  });
};

const login = async (payload: ILoginPayLoad): Promise<IResponse<ILoginResponse>> => {
  return await https.post({
    url: "/auth/login",
    body: JSON.stringify(payload),
  });
};

const verifyEmail = async (payload: { token: string }): Promise<IResponse<ILoginResponse>> => {
  return await https.post({
    url: "/auth/confirm-email",
    body: JSON.stringify(payload),
  });
};

const createVerifyEmailOtp = async (): Promise<IResponse<null>> => {
  return await https.get({
    url: "/auth/confirm-email",
  });
};

const createForgetPasswordUrl = async (email: string): Promise<IResponse<null>> => {
  return await https.get({
    url: "/auth/change-password",
    query: {
      email,
    },
  });
};

const resetPassword = async (payload: IResetPasswordPayload): Promise<IResponse<ILoginResponse>> => {
  return await https.post({
    url: "/auth/change-password",
    body: JSON.stringify(payload),
  });
};

const authService = {
  register,
  login,
  createVerifyEmailOtp,
  verifyEmail,
  createForgetPasswordUrl,
  resetPassword,
};

export default authService;
