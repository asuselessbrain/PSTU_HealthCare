import { IFile } from './../../../interfaces/file';
import { Prisma, UserRole, UserStatus } from "../../../../generated/prisma"
import bcrypt from 'bcrypt';
import { uploadToCloudinary } from '../../../shared/imageUploader';
import { prisma } from '../../../shared/prisma';
import { IAdmin, IDoctor, IPatient } from './user.interface';
import { config } from '../../../config';
import pagination from '../../../healper/paginationHealper';
import { searchField } from './user.constrant';

const createAdminInDB = async (file: IFile, data: IAdmin) => {

    const hashedPassword = await bcrypt.hash(data.password, Number(config.salt_rounds))

    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const profileImg = await uploadToCloudinary(file)

    data.admin.profilePhoto = profileImg?.secure_url ?? null
    const result = await prisma.$transaction(async (transaction) => {
        await transaction.user.create({
            data: userData
        })
        const createAdmin = await transaction.admin.create({
            data: data.admin
        })
        return createAdmin;
    })
    return result
}

const createDoctorInDB = async (file: IFile, payload: IDoctor) => {
    const hashedPassword = await bcrypt.hash(payload.password, Number(config.salt_rounds))

    const userData = {
        email: payload.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }

    const profileImg = await uploadToCloudinary(file)
    payload.doctor.profilePhoto = profileImg?.secure_url ?? null

    const result = await prisma.$transaction(async (transaction) => {
        await transaction.user.create({
            data: userData
        })
        const createAdmin = await transaction.doctor.create({
            data: payload.doctor
        })
        return createAdmin;
    })
    return result
}

const createPatientInDB = async (file: IFile, payload: IPatient) => {
    const hashedPassword = await bcrypt.hash(payload.password, Number(config.salt_rounds))

    const userData = {
        email: payload.patient.email,
        password: hashedPassword,
        role: UserRole.PATIENT
    }

    const profileImg = await uploadToCloudinary(file)
    payload.patient.profilePhoto = profileImg?.secure_url ?? null

    const result = await prisma.$transaction(async (transaction) => {
        await transaction.user.create({
            data: userData
        })
        const createAdmin = await transaction.patient.create({
            data: payload.patient
        })
        return createAdmin;
    })
    return result
}

const search = (searchFields: Prisma.UserWhereInput[], searchTerm: string) => {
    return searchFields.push(
        {
            OR: searchField.map(item => ({
                [item]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        }
    )
}

const filter = (searchFields: Prisma.UserWhereInput[], filterData: any) => {
    searchFields.push({
            AND: Object.keys(filterData).map(item => ({
                [item]: {
                    equals: filterData[item]
                }
            }))
        })
}

const getAllUserFromDB = async (payload: any, options: any) => {

    const { searchTerm, ...filterData } = payload
    const { page, skip, take, sortBy, sortOrder } = pagination(options)

    let searchFields: Prisma.UserWhereInput[] = [];

    if (payload.searchTerm) {
        search(searchFields, searchTerm)
    }

    if (Object.keys(filterData).length) {
        searchFields.push({
            AND: Object.keys(filterData).map(item => ({
                [item]: {
                    equals: filterData[item]
                }
            }))
        })
    }

    const whereCondition : Prisma.UserWhereInput = { AND: searchFields }

    const result = await prisma.user.findMany({
        where: whereCondition,
        skip,
        take,
        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const total = await prisma.user.count({
        where: whereCondition
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
export const userServices = {
    createAdminInDB,
    createDoctorInDB,
    createPatientInDB,
    getAllUserFromDB
}