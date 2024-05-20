"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const index_1 = require("../controller/index");
const prisma = new client_1.PrismaClient();
const app = express_1.default.Router();
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { email, password } = req.body;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = yield (0, index_1.getUserByEmail)(email);
        if (!user) {
            return res.json({ message: "User not found", status: false });
        }
        if (user.password_hash !== password) {
            return res.json({ message: "Incorrect Password", status: false });
        }
        return res.json({ mesage: "User get logged in", status: true, user });
    }
    catch (error) {
        console.log(error);
        res.json({ mesaage: "something went wrong..!", status: false });
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, index_1.createUser)(req.body);
        res.status(201).json({
            message: `${user.user_type} Successfully Created`,
            user: user,
            status: true,
        });
        console.log("User---->", user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}));
// Get all users
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, index_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Create a new property
app.post("/properties", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, title, description, location, area, bedrooms, bathrooms, amenities, price, } = req.body;
    const newArea = parseInt(area);
    const newBad = parseInt(bedrooms);
    const newBath = parseInt(bathrooms);
    const newPrice = parseInt(price);
    console.log(req.body);
    try {
        const property = yield prisma.property.create({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}));
// Get all properties
app.get("/properties", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const properties = yield (0, index_1.getAllProperties)();
        res
            .status(200)
            .json({ message: "Get all the properties..!", status: true, properties });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.get("/properties/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const properties = yield prisma.property.findMany({
            where: {
                user_id: userId,
            },
        });
        res.status(200).json({
            properties,
            message: "Get all the Properties...!",
            status: true,
        });
    }
    catch (error) {
        console.log(error);
        throw new Error("Error fetching properties: " + error.message);
    }
}));
// Mark interest in a property
app.post("/interests", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buyer_id, property_id } = req.body;
    try {
        const interest = yield prisma.interested.create({
            data: {
                buyer_id,
                property_id,
            },
        });
        res.status(201).json(interest);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Like a property
app.post("/likes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, property_id } = req.body;
    try {
        const like = yield prisma.like.create({
            data: {
                user_id,
                property_id,
            },
        });
        res.status(201).json(like);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = app;
