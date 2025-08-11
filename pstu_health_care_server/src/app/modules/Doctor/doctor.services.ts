
import { Prisma } from "../../../../generated/prisma";
import pagination from "../../../healper/paginationHealper";
import { filtering } from "../../../shared/filtering";
import { prisma } from "../../../shared/prisma"
import { searching } from "../../../shared/searching";
import { doctorSearchFields } from "./doctor.constant";

const getAllDoctorFromDB = async (query: any) => {
    const { searchTerm, page, limit, sortBy, sortOrder, ...filterData } = query;

    const options = {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: String(sortBy || "createdAt"),
        sortOrder: String(sortOrder || "asc")
    };

    const { page: currentPage, skip, take } = pagination(options);

    let searchItems: Prisma.DoctorWhereInput[] = []
    if (searchTerm) {
        searching(searchTerm, searchItems, doctorSearchFields)
    }

    if (Object.keys(filterData).length > 0) {
        filtering(searchItems, filterData)

    }

    const orCondition: Prisma.DoctorWhereInput = { AND: searchItems }


    const result = await prisma.doctor.findMany({
        where: orCondition,
        skip,
        take,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            doctorSpecialties: true
        }
    })
    const total = await prisma.doctor.count({
        where: orCondition
    })

    return {
        meta: {
            page: currentPage,
            limit: take,
            total
        },
        result
    }
}



export const doctorServices = {
    getAllDoctorFromDB
}