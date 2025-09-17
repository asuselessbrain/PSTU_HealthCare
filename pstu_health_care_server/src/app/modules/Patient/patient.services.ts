import { prisma } from "../../../shared/prisma"

const getAllPatientFromDB = async() => {
    const result = await prisma.patient.findMany()
    return result
}

export const patientServices = {
    getAllPatientFromDB
}