import { Prisma, PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any) => {
    const {searchTerm, ...filteredData} = params
    let search: Prisma.AdminWhereInput[] = []
    const searchFields = ['name', 'email']

    if (params.searchTerm) {

        search.push({
            OR: searchFields.map(field => ({
                [field]: { contains: params.searchTerm, mode: 'insensitive' }
            }))
        })
    }

    if(Object.keys(filteredData).length>0){
        search.push({AND: Object.keys(filteredData).map(key=>({
            [key]: {
                equals : filteredData[key]
            }
        }))})
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