export type UserTypeType = "player" | "manger";

export interface UserType {
  _id: string;
  fullName: string;
  password: string;
  salt: string;
  phone: number;
  email: string;
  userType: UserTypeType;
  status:"pending"|"active"
}


