import status from "http-status";
import { IFile } from "../../../interfaces/file";
import { prisma } from "../../../shared/prisma";
import AppError from "../../errors/AppError";
import { uploadToCloudinary } from "../../../shared/imageUploader";
import pagination from "../../../healper/paginationHealper";

const createSpecialtiesInDB = async (file: IFile, payload: { title: string, icon: string }) => {
    const isSpecialtiesExist = await prisma.specialties.findUnique({
        where: {
            title: payload.title
        }
    })

    if (isSpecialtiesExist) {
        throw new AppError(status.BAD_REQUEST, "Specialties already exist!")
    }

    if (file) {
        const icon = await uploadToCloudinary(file)
        payload.icon = icon?.secure_url as string
    }

    const result = await prisma.specialties.create({
        data: payload
    })

    return result
}

const updateSpecialtiesInDB = async (file: IFile, id: string, payload: { title: string, icon: string }) => {
    const specialtiesInfo = await prisma.specialties.findUniqueOrThrow({
        where: {
            id
        }
    })

    if (file) {
        const icon = await uploadToCloudinary(file)
        payload.icon = icon?.secure_url as string
    }

    const updatedInfo = await prisma.specialties.update({
        where: {
            id: specialtiesInfo.id
        },
        data: payload
    })
    return updatedInfo
}

const getAllSpecialtiesFromDb = async (query: any, options: any) => {
    const { page, skip, take, sortBy, sortOrder } = pagination(options)
    const result = await prisma.specialties.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive"
            }
        },
        skip,
        take,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.specialties.count({
        where: {
            title: {
                contains: query,
                mode: "insensitive"
            }
        },
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

export const specialtiesServices = {
    createSpecialtiesInDB,
    updateSpecialtiesInDB,
    getAllSpecialtiesFromDb
}