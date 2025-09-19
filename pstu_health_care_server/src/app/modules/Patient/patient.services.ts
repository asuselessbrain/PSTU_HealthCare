import status from "http-status";
import { Prisma, UserStatus } from "../../../../generated/prisma";
import pagination from "../../../healper/paginationHealper";
import { filtering } from "../../../shared/filtering";
import { prisma } from "../../../shared/prisma"
import { searching } from "../../../shared/searching";
import AppError from "../../errors/AppError";
import { patientSearchFields } from "./patient.searchField";

const getAllPatientFromDB = async (query: any) => {
    const { searchTerm, page, limit, sortBy, sortOrder, ...filterData } = query;

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

    const { page: currentPage, skip, take } = pagination({
        page,
        limit,
        sortBy,
        sortOrder
    });

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
            currentPage,
            limit: take,
            total
        },
        result
    };
}

const softDeletePatientFromDB = async (id: string) => {

    const isPatientExist = await prisma.patient.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    })

    const isUserExist = await prisma.user.findUniqueOrThrow({
        where: {
            email: isPatientExist.email,
            status: UserStatus.ACTIVE
        }
    })

    await prisma.$transaction(async (transactionClient) => {
        await transactionClient.patient.update({
            where: {
                id: isPatientExist.id
            },
            data: {
                isDeleted: true
            }
        })
        await transactionClient.user.update({
            where: {
                email: isPatientExist.email,
                id: isUserExist.id
            },
            data: {
                status: UserStatus.DELETED
            }
        })
    })

    return null
}

const getSinglePatientInfoFromDB = async (id: string) => {
    console.log(id)

        const result = await prisma.patient.findUniqueOrThrow({
            where: {
                id,
                isDeleted: false
            }
        })
        return result
}

export const patientServices = {
    getAllPatientFromDB,
    softDeletePatientFromDB,
    getSinglePatientInfoFromDB
}