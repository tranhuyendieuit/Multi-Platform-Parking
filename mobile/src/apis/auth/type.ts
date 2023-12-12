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
  user_name: string;
  password: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  vehicle_brand: string;
  vehicle_model: string;
  register_date: string;
  plate_number: string;
}
