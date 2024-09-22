export interface IEmployeeList {
  id: number,
  employee_name: string,
  employee_salary: number,
  employee_age: number,
  profile_image: string
}

export interface IEmployeeAPIResponse {
  status: string;
  data: IEmployeeList[],
  message: string
}
