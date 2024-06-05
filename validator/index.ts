import {string, z} from 'zod'

export const createUserSchema = z.object({
    first_Name:z.string({message:"First Name Must be the String.."}).min(2).max(255),
    last_name:z.string().min(2).max(255),
    email:z.string(),
    password:z.string(),
    user_type:z.string(),
})

export const loginSchema = z.object({
  email:z.string().email(),
  password:z.string()
})

export const createPropertySchema = z.object({
  user_id : z.number(),
  title : z.string(),
  description: z.string(),
  location: z.string(),
  area: z.string(),
  bedrooms: z.string(),
  bathrooms: z.string(),
  amenities: z.string(),
  price: z.string(),
})


// first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   password_hash: string;
//   user_type: UserType;