import { IAmount } from "@/utils/types";

export interface IResponse<D = null> {
  data?: D;
  status: boolean;
  message: string;
}

export interface ILoginPayLoad {
  emailOrUsername: string;
  password: string;
}

export interface IRegisterPayLoad {
  email: string;
  password: string;
  userName: string;
}

export interface IResetPasswordPayload {
  email: string;
  password: string;
  token: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}

export interface IUser {
  id: string;
  userName: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  profile?: IProfile;
  roleName: string;
  planName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  phoneNumber: string;
  interests: IInterest[];
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInterest {
  id: string;

  name: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface IPaymentMethod {
  id: string;

  name: string;

  image: string;

  fields: string[];

  disabled: boolean;

  isDefault: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export interface IWallet {
  id: string;

  userId: string;

  amount: number;

  transactions: IWalletTransaction[];

  createdAt: Date;

  updatedAt: Date;
}

export interface IWalletTransaction {
  id: string;

  action: string;

  type: string;

  amount: number;

  currency: string;

  description: string;

  prevBalance: number;

  currBalance: number;

  wallet: string;

  transactionReference: string;

  transaction: ITransaction;

  createdAt: Date;

  updatedAt: Date;
}

export interface ITransaction {
  id: string;

  wallet?: IWallet;

  amount: number;

  currency: string;

  paymentMethod: string;

  type: string;

  status: string;

  progress: string;

  reference: string;

  paystackTransactionId: string;

  paystackTransactionUrl: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface ICreditWalletPayload {
  amount: IAmount;
  paymentMethod: string;
}
