import { IFile } from './../../../interfaces/file';
import { UserRole } from "../../../../generated/prisma"
import bcrypt from 'bcrypt';
import { uploadToCloudinary } from '../../../shared/imageUploader';
import { prisma } from '../../../shared/prisma';
import { IAdmin } from './user.interface';

const createAdminInDB = async(file: IFile, data: IAdmin) => {

    const hashedPassword = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const profileImg = await uploadToCloudinary(file)

    data.admin.profilePhoto = profileImg?.secure_url
    const result = await prisma.$transaction(async(transaction)=> {
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

const createDoctorInDB = async(file: IFile, payload: any) => {

}

export const userServices = {
    createAdminInDB,
    createDoctorInDB
}