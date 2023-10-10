export interface IResponse<D> {
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
