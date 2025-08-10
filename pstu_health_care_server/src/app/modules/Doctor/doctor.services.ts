import { prisma } from "../../../shared/prisma"

const getAllDoctorFromDB = async() => {
    const result = await prisma.doctor.findMany()
    return result
}

export const doctorServices = {
    getAllDoctorFromDB
}