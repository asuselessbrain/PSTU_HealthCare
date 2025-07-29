import { Prisma, PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient();

const getAllAdminFromDB = async (params: any) => {

    const { searchTerm, ...filterData } = params;

    const searchItem = ["name", "email"]

    let searchItems: Prisma.AdminWhereInput[] = []

    if (params.searchTerm) {
        searchItems.push(
            {
                OR: searchItem.map(item => ({
                    [item]: {
                        contains: params.searchTerm,
                        mode: "insensitive"
                    }
                }))
            }
        )
    }

    if (Object.keys(filterData).length > 0) {
        searchItems.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        })
    }

    const whereIncludeSearch: Prisma.AdminWhereInput = { AND: searchItems }

    const result = await prisma.admin.findMany(
        {
            where: whereIncludeSearch
        }
    )
    return result;
}

export const adminServices = {
    getAllAdminFromDB
}