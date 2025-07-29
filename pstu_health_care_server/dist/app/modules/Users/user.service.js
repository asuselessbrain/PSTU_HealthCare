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
exports.userServices = void 0;
const prisma_1 = require("../../../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const createUserInDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {
        email: data.admin.email,
        password: data.password,
        role: prisma_1.UserRole.ADMIN
    };
    const result = yield prisma.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield transaction.user.create({
            data: userData
        });
        const createAdmin = yield transaction.admin.create({
            data: data.admin
        });
        return createAdmin;
    }));
    return result;
});
exports.userServices = {
    createUserInDB
};
