"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPropertySchema = exports.loginSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    first_Name: zod_1.z.string({ message: "First Name Must be the String.." }).min(2).max(255),
    last_name: zod_1.z.string().min(2).max(255),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    user_type: zod_1.z.string(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.createPropertySchema = zod_1.z.object({
    user_id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    location: zod_1.z.string(),
    area: zod_1.z.string(),
    bedrooms: zod_1.z.string(),
    bathrooms: zod_1.z.string(),
    amenities: zod_1.z.string(),
    price: zod_1.z.string(),
});
// first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   password_hash: string;
//   user_type: UserType;
