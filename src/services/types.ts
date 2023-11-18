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
  backgroundPicture: string;
  phoneNumber: string;
  interests: string[];
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
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

  balance: number;

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

export interface IPlan {
  active: boolean;

  id: string;

  name: string;

  description: string;

  type: string;

  planPermissions: IPlanPermission[];

  price: number;

  createdAt: Date;

  updatedAt: Date;
}

export interface IPlanPermission {
  id: string;

  name: string;

  description: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface IIdea {
  id: string;

  userId: string;

  user: IUser;

  title: string;

  description: string;

  categories: ICategory[];

  media: string[];

  collaborators: string[];

  ideaType: IdeaTypeEnum;

  ideaNeed: IdeaNeedEnum;

  location: string;

  website: string;

  role: string;

  competitors: string[];

  additionalAttachment: string[];

  ideaCost: IAmount;

  sellingReason: string;

  valuation: IAmount;

  estimationCost: IAmount;

  ROITimeline: string;

  projectedRevenue: IAmount;

  fundingStage: string;

  totalMoneyRaised: IAmount;

  executionCost: IAmount;

  seeking: string;

  sharesRating: number;

  comments: IComment[];

  likes: ILike[];

  shares: IShare[];

  createdAt: Date;

  updatedAt: Date;
}

export enum IdeaTypeEnum {
  SHARED = "SHARED",
  VAULT = "VAULT",
}

export enum IdeaNeedEnum {
  FUNDING = "FUNDING",
  SALE = "SALE",
  NEW_CONCEPT = "NEW_CONCEPT",
}

export enum LIkeTypeEnum {
  IDEA = "IDEA",
  COMMENT = "COMMENT",
}

export interface ILike {
  id: string;

  userId: string;

  type: LIkeTypeEnum;

  createdAt: Date;

  updatedAt: Date;
}
export interface IComment {
  id: string;

  userId: string;

  comment: string;

  type: LIkeTypeEnum;

  children?: Comment[];

  comments: IComment[];

  likes: ILike[];

  shares: IShare[];

  createdAt: Date;

  updatedAt: Date;
}
export interface IShare {
  id: string;

  userId: string;

  type: LIkeTypeEnum;

  createdAt: Date;

  updatedAt: Date;
}

export type NotificationEventTypes = "follow-request" | "follow-request-accepted";
export interface INotification<T> {
  id: string;

  eventType: NotificationEventTypes;

  userId: string;

  seen: boolean;

  data: T;

  createdAt: Date;

  updatedAt: Date;
}

export interface IFollow {
  id: string;

  user: IUser;

  follower: IUser;

  status: FollowStatusEnum;

  createdAt: Date;

  updatedAt: Date;
}

export enum FollowStatusEnum {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface IIdeaQuery {
  title?: string;
  spotlight?: boolean;
  category?: string;
  categories?: string[];
  user?: string;
}
