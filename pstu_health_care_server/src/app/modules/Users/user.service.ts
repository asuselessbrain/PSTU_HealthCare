import { IFile } from './../../../interfaces/file';
import { UserRole } from "../../../../generated/prisma"
import bcrypt from 'bcrypt';
import { uploadToCloudinary } from '../../../shared/imageUploader';
import { prisma } from '../../../shared/prisma';
import { IAdmin, IDoctor } from './user.interface';
import { config } from '../../../config';

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

export const userServices = {
    createAdminInDB,
    createDoctorInDB
}