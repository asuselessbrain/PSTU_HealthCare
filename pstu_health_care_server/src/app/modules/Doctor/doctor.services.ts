
import status from "http-status";
import { Prisma } from "../../../../generated/prisma";
import pagination from "../../../healper/paginationHealper";
import { filtering } from "../../../shared/filtering";
import { prisma } from "../../../shared/prisma"
import { searching } from "../../../shared/searching";
import AppError from "../../errors/AppError";
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

const getSingleDoctorFromDB = async (id: string) => {
    const result = await prisma.doctor.findUniqueOrThrow({
        where: {
            id
        }
    })

    if(result.isDeleted){
        throw new AppError(status.UNAUTHORIZED, "You are not authorized!")
    }

    return result
}

const hardDeleteDoctorFromDB = async(id: string) => {

    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
        where: {
            id
        }
    })

    if(!doctorInfo){
        throw new AppError(status.NOT_FOUND, "Doctor is not found!")
    }

    if(doctorInfo.isDeleted){
        throw new AppError(status.UNAUTHORIZED, "Unauthorized access!")
    }

    const result = await prisma.doctor.delete({
        where: {
            id
        }
    })

    return result
}



export const doctorServices = {
    getAllDoctorFromDB,
    getSingleDoctorFromDB
}