export interface LoginInfo {
  email: string;
  password: string;
}

export interface RegUser extends LoginInfo {
  firstName: String;
  lastName: String;
  department?: String;
  role: String;
  enrolment?: string | number
}

export interface PendingUser {
  id: string
  name: string
  department: string
  email: string
  role: string
}

export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  department: string;
  role: string;
}