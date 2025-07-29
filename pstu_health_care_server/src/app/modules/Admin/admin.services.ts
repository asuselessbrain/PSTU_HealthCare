import { Prisma, PrismaClient } from "../../../../generated/prisma"
import pagination from "../../../healper/paginationHealper";

const prisma = new PrismaClient();


const getAllAdminFromDB = async (params: any, options: any) => {

    const { searchTerm, ...filterData } = params;
    const {skip, take, sortBy, sortOrder} = pagination(options)

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
            where: whereIncludeSearch,
            skip,
            take,
            orderBy: {
                [sortBy]: sortOrder
            }
        }
    )
    return result;
}

export const adminServices = {
    getAllAdminFromDB
}