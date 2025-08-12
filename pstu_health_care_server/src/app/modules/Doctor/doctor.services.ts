
import status from "http-status";
import { Prisma, UserStatus } from "../../../../generated/prisma";
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

const softDeleteDoctorFromDB = async(id: string) => {

    const isDoctorExist = await prisma.doctor.findUniqueOrThrow({
        where: {
            id
        }
    })

    if(isDoctorExist.isDeleted){
        throw new AppError(status.NOT_FOUND, "Doctor is not found!")
    }

    const isUserExist = await prisma.user.findUniqueOrThrow({
        where: {
            email: isDoctorExist.email
        }
    })

    if(isUserExist.status === UserStatus.DELETED){
        throw new AppError(status.NOT_FOUND, "User is not found!")
    }

    const result = await prisma.$transaction(async(transactionClient)=>{
        

        const deleteDoctor = await transactionClient.doctor.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        })

        await transactionClient.user.update({
            where: {
                email: deleteDoctor.email
            },
            data: {
                status: UserStatus.DELETED
            }
        })
        return deleteDoctor
    })
    return result
}

export const doctorServices = {
    getAllDoctorFromDB,
    getSingleDoctorFromDB,
    hardDeleteDoctorFromDB,
    softDeleteDoctorFromDB
}