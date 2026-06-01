import { IUser } from "../interface/user.interface.js";

export class UserModel implements IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role || "user";
  }
}