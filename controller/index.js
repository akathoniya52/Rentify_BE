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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProperties = exports.getAllUsers = exports.createUser = exports.getUserByEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    }
    catch (error) {
        console.log("Error insdie the user");
    }
});
exports.getUserByEmail = getUserByEmail;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(user);
        const response = yield prisma.user.create({
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
    }
    catch (error) {
        console.log("Error : While creating the user", error);
    }
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        return users;
    }
    catch (error) {
        throw new Error("Something wrong happend..");
    }
});
exports.getAllUsers = getAllUsers;
const getAllProperties = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.property.findMany();
        return response;
    }
    catch (error) {
        throw new Error("Something went wrong..!");
    }
});
exports.getAllProperties = getAllProperties;
