import { Prisma } from "../../../../generated/prisma";
import pagination from "../../../healper/paginationHealper";
import { filtering } from "../../../shared/filtering";
import { prisma } from "../../../shared/prisma"
import { searching } from "../../../shared/searching";
import { patientSearchFields } from "./patient.searchField";

const getAllPatientFromDB = async (query: any) => {
    const { searchTerm, page, limit, sortBy, sortOrder, ...filterData } = query;

    const options = {
        page,
        limit,
        sortBy,
        sortOrder
    }

    let searchItems: Prisma.PatientWhereInput[] = []

    if (searchTerm) {
        searching(searchTerm, searchItems, patientSearchFields)
    }

    if (Object.keys(filterData).length > 0) {
        filtering(searchItems, filterData)
    }

    searchItems.push({
        isDeleted: false
    })

    const whereIncludeSearch: Prisma.PatientWhereInput = { AND: searchItems }

    const { page: currentPage, skip, take } = pagination(options);

    const result = await prisma.patient.findMany({
        where: whereIncludeSearch,
        skip,
        take,
        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const total = await prisma.patient.count({
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

export const patientServices = {
    getAllPatientFromDB
}