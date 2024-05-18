import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:amit@localhost:5432/postgres",
    },
  },
});
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors({ origin: "*", credentials: true }));

// Routes

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Body--->",req.body)
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.json({ message: "User not found", status: false });
    }
    if (user.password_hash !== password) {
      return res.json({ message: "Incorrect Password", status: false });
    }

    return res.json({ mesage: "User get logged in", status: true, user });
  } catch (error: any) {
    console.log(error)
    res.json({ mesaage: "something went wrong..!", status: false });
  }
});

app.post("/users", async (req, res) => {
  console.log("Request comming ..");
  const { first_name, last_name, email, phone_number, password, user_type } =
    req.body;
  console.log(req.body);
  try {
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        password_hash: password,
        user_type,
      },
    });
    res.status(201).json({
      message: `${user_type} Successfully Created`,
      user: user,
      status: true,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new property
app.post("/properties", async (req, res) => {
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
    const properties = await prisma.property.findMany();
    res
      .status(200)
      .json({ message: "Get all the properties..!", status: true, properties });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});



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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
