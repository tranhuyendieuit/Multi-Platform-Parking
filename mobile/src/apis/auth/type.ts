export interface LoginResponse {
  data: string;
  status: string;
}

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  parking_area: any;
  phone_number: string;
  role_code: string;
  user_id: string;
  user_name: string;
  vehicles: Vehicle[];
}
export interface Vehicle {
  accepted_parking_date: any;
  plate_number: string;
  register_date: string;
  register_parking_date: any;
  status: number;
  username_owner: string;
  vehicle_brand: string;
  vehicle_id: string;
  vehicle_model: string;
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
