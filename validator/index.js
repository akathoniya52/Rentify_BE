"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        first_Name: zod_1.z.string({ message: "First Name Must be the String.." }).min(2).max(255),
        last_name: zod_1.z.string().min(2).max(255),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        user_type: zod_1.z.string(),
    }),
});
// first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   password_hash: string;
//   user_type: UserType;
