import { Prisma, PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any) => {

    let search: Prisma.AdminWhereInput[] = []
    const searchFields = ['name', 'email']

    if (params.searchTerm) {

        search.push({
            OR: searchFields.map(field => ({
                [field]: { contains: params.searchTerm, mode: 'insensitive' }
            }))
        })
    }

    const whereCondition: Prisma.AdminWhereInput = { AND: search }

    const result = await prisma.admin.findMany(
        {
            where: whereCondition
        }
    )
    return result;
}

export const adminServices = {
    getAllAdminFromDB
}