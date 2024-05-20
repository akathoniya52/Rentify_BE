import { UserType } from "@prisma/client";

export interface createUser {
  email: string;
  password: string;
}

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password_hash: string;
  user_type: UserType;
  created_at: Date;
}



export type createUserType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  user_type: UserType;
}

