import { NextFunction, Request, Response } from "express";
import { createUserType } from "../interface";

export const validator = async(schema:createUserType)=> async(req:Request,res:Response,next:NextFunction)=>{
  try {
  // const value = await schema.parseAsync({body:req.body})
    
  } catch (error) {
    
  }
}