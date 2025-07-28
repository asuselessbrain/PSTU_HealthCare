import { PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient();

const getAllAdminFromDB = async() => {
    const result = await prisma.admin.findMany()
    return result;
}

export const adminServices = {
    getAllAdminFromDB
}