import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createUser, getAllProperties, getAllUsers, getUserByEmail } from "../controller/index";
import { createPropertySchema, createUserSchema, loginSchema } from "../validator";
var jwt = require('jsonwebtoken');

const JWT_SECRET = "AMITDEV"

const prisma = new PrismaClient();

const app = express.Router();

app.post("/login", async (req: Request, res: Response) => {
  // const { email, password } = req.body;
  const {success} = loginSchema.safeParse(req.body)
  if(!success) return res.status(411).json({message:"Try again with valid inputs"})

  const email : string = req.body.email;
  const password : string = req.body.password;
  console.log("Boy------>",req.body)
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.json({ message: "User not found", status: false });
    }
    if (user.password_hash !== password) {
      return res.json({ message: "Incorrect Password", status: false });
    }
    const token = jwt.sign(user.user_id,JWT_SECRET)
    return res.json({ mesage: "User get logged in", status: true, user,token });
  } catch (error: any) {
    console.log("Error------>",error);
    res.status(404).json({ mesaage: "something went wrong..!", status: false });
  }
});

app.post("/users", async (req, res) => {
  try {
    const responce = createUserSchema.safeParse(req.body)
    console.log(responce.error)
    if(!responce.success) return res.status(411).json({message:"Try again with valid inputs"})
    const user = await createUser(req.body)
    res.status(201).json({
      message: `${user?.user_type} Successfully Created`,
      user: user,
      status: true,
    });
    console.log("User---->",user)
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new property
app.post("/properties", async (req, res) => {
  const {success} = createPropertySchema.safeParse(req.body);
  if(!success) return res.status(411).json({message:"Try again with valid inputs"})
  const {
    user_id,
    title,
    description,
    location,
    area,
    bedrooms,
    bathrooms,
    amenities,
    price,
  } = req.body;
  const newArea = parseInt(area);
  const newBad = parseInt(bedrooms);
  const newBath = parseInt(bathrooms);
  const newPrice = parseInt(price);
  console.log(req.body);
  try {
    const property = await prisma.property.create({
      data: {
        user_id,
        title,
        description,
        location,
        area: newArea,
        bedrooms: newBad,

        bathrooms: newBath,
        amenities,
        price: newPrice,
      },
    });
    res.status(201).json({
      property,
      message: "Property post Successfully..!",
      status: true,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all properties
app.get("/properties", async (req, res) => {
  try {
    const properties = await getAllProperties()
    res
      .status(200)
      .json({ message: "Get all the properties..!", status: true, properties });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/property/:id',async (req,res)=>{
  const id = parseInt(req.params.id);
  try {
    const property = await prisma.property.findUnique({
      where:{
        property_id:id
      }
    })
    console.log("Property----->",property)
    res.status(200).json({property})
  } catch (error) {
    res.status(404).json({message:"Property Not Found..!"})
  }
})

app.get("/properties/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const properties = await prisma.property.findMany({
      where: {
        user_id: userId,
      },
    });
    res.status(200).json({
      properties,
      message: "Get all the Properties...!",
      status: true,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("Error fetching properties: " + error.message);
  }
});

// Mark interest in a property
app.post("/interests", async (req, res) => {
  const { buyer_id, property_id } = req.body;
  try {
    const interest = await prisma.interested.create({
      data: {
        buyer_id,
        property_id,
      },
    });
    res.status(201).json(interest);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Like a property
app.post("/likes", async (req, res) => {
  const { user_id, property_id } = req.body;
  try {
    const like = await prisma.like.create({
      data: {
        user_id,
        property_id,
      },
    });
    res.status(201).json(like);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
