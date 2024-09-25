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
  id: string | number
}

export interface IUserLoggedIn { 
  fullname: string, 
  role: '',
  id: string | number
}


export const Roles ={
  ADMIN: 'admin',
  USER: 'user'
}

