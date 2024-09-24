export interface IUser {
  email: string,
  password: string,
  fullname: string,
  dob: Date,
  address: string,
  city: string,
  phoneno: string,
  role: 'admin' | 'user',
  status: string,
  id: number
}

export const Roles ={
  ADMIN: 'admin',
  USER: 'user'
}

