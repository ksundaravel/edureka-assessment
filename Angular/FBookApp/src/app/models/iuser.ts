export interface IUser {
  email: string;
  password: string;
  fullname: string;
  dob: Date;
  address: string;
  city: string;
  phoneno: string;
  role: "admin" | "user";
  status: string;
  id: number;
}

export interface IUserLoggedIn {
  fullname: string;
  role: "";
  id: number;
}

export interface IUserRequest {
  id: number,
  requestStatus: string,
  requestedBy: number,
  requestedTo: number,
  requestedOn: Date
}

export const Roles = {
  ADMIN: "admin",
  USER: "user",
};

export interface IUserWithRequest {
  userDetails: IUser;
  requestedDetails?: IUserRequest | null;
}
