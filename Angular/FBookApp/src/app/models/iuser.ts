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
  id: string | number;
}

export interface IUserLoggedIn {
  fullname: string;
  role: "";
  id: string | number;
}

export interface IUserRequest {
  id: string | number,
  requestStatus: string,
  requestedBy: string | number,
  requestedTo: string | number,
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
