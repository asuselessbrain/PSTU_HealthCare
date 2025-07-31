import { IFile } from './../../../interfaces/file';
import { UserRole } from "../../../../generated/prisma"
import bcrypt from 'bcrypt';
import { uploadToCloudinary } from '../../../shared/imageUploader';

const createUserInDB = async(file: IFile, data: any) => {

    const hashedPassword = await bcrypt.hash(data.password, 12)

    const userData = {
        email: data.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const profileImg = await uploadToCloudinary(file)
    // const profileImg = profileImgUpload?.secure_url

    data.admin.profileImg = profileImg?.secure_url
    console.log(data)
    // const result = await prisma.$transaction(async(transaction)=> {
    //     await transaction.user.create({
    //         data: userData
    //     })
    //     const createAdmin = await transaction.admin.create({
    //         data: data.admin
    //     })
    //     return createAdmin;
    // })
    // return result
}

export const userServices = {
    createUserInDB
}