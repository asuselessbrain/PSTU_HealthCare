import { PrismaClient, UserRole } from "../../../../generated/prisma"

const prisma = new PrismaClient();

const createUserInDB = async(data: any) => {

    const userData = {
        email: data.admin.email,
        password: data.password,
        role: UserRole.ADMIN
    }
    const result = await prisma.$transaction(async(transaction)=> {
        await transaction.user.create({
            data: userData
        })
        const createAdmin = await transaction.admin.create({
            data: data.admin
        })
        return createAdmin;
    })
    return result
}

export const userServices = {
    createUserInDB
}