import {string, z} from 'zod'

export const createUserSchema = z.object({
  body:z.object({
    first_Name:z.string({message:"First Name Must be the String.."}).min(2).max(255),
    last_name:z.string().min(2).max(255),
    email:z.string(),
    password:z.string(),
    user_type:z.string(),
    
  }),
})


// first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   password_hash: string;
//   user_type: UserType;