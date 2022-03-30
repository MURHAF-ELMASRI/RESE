export type UserTypeType = "normal" | "manger";
export interface User {
  _id: string;
  fullName: string;
  password: string;
  salt: string;
  phone: number;
  email: string;
  userType: UserTypeType;
}
