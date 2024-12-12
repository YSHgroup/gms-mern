export interface LoginInfo {
  email: string;
  password: string;
}

export interface RegUser extends LoginInfo {
  firstName: String;
  lastName: String;
  department: String;
  role: String;
}

export interface PendingUser {
  id: string
  name: string
  department: string
  email: string
  role: string
}