export interface IUser {
  email: string,
  password: string,
  fullname: string,
  dob: Date,
  address: string,
  city: string,
  phoneno: string,
  role: string,
  status: string,
  id: number
}

export const Roles ={
  ADMIN: 'admin',
  USER: 'user'
}

