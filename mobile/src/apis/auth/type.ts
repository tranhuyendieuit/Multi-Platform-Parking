export interface LoginResponse {
  data: string;
  status: string;
}

export interface IUser {
  id: number;
  fullname: string;
  email: string;
  avatar: string;
  roles: string;
  isVerify: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginPayload {
  user_name: string;
  password: string;
}

export interface IRegisterPayload {
  username: string;
  password: string;
  fullname: string;
}
