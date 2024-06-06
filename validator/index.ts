import { z} from 'zod'

export const createUserSchema = z.object({
    first_name:z.string({message:"First Name Must be the String.."}).min(2).max(255),
    last_name:z.string().min(2,{message:"Name should have atleast 2 Character"}).max(255),
    email:z.string({message:"gmail should be string"}),
    password:z.string({message:"Password should be string"}),
    user_type:z.string({message:"user type should be seller or buyer"}),
    phone_number:z.string({message:"Phone Number should be string"})
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