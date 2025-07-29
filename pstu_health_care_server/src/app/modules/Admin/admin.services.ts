import { Admin } from './../../../../generated/prisma/index.d';
import { Prisma, PrismaClient } from "../../../../generated/prisma"
import pagination from "../../../healper/paginationHealper";
import { searchFields } from "./admin.constant";

const prisma = new PrismaClient();


const getAllAdminFromDB = async (params: any, options: any) => {

    const { searchTerm, ...filterData } = params;
    const { page, skip, take, sortBy, sortOrder } = pagination(options)

    let searchItems: Prisma.AdminWhereInput[] = []

    if (params.searchTerm) {
        searchItems.push(
            {
                OR: searchFields.map(item => ({
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
    const total = await prisma.admin.count({
        where: whereIncludeSearch
    })
    return {
        meta: {
            page,
            limit: take,
            total
        },
        result
    };
}

const getSingleAdminFromDB = async (id: string): Promise<Admin | null | undefined> => {
    const result = await prisma.admin.findUnique({
        where: {
            id
        }
    })
    return result
}

const updateAdminInDB = async (id: string, adminInfo: Partial<Admin>) => {
    const result = await prisma.admin.update({
        where: {
            id
        },
        data: {
            ...adminInfo
        }
    })
    return result
}

export const adminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateAdminInDB
}