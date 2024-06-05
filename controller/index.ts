import { PrismaClient } from "@prisma/client";
import { User, createUserType } from "../interface";

const prisma = new PrismaClient();

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.log("Error insdie the user")
  }
};

export const createUser = async (user: createUserType) => {
  try {
    console.log(user)
    const response = await prisma.user.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        password_hash: user.password,
        user_type: user.user_type
      },
    });
    return response;
  } catch (error) {
    console.log("Error : While creating the user",error)
  }
};

export const getAllUsers = async():Promise<User[]> =>{
  try {
    const users = await prisma.user.findMany();
  return users
  } catch (error) {
    throw new Error("Something wrong happend..");
    
  }
}

export const getAllProperties =async()=>{
    try {
      const response = await prisma.property.findMany();
      return response
    } catch (error) {
      throw new Error("Something went wrong..!")
    }  
}
