
import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../../shared/prisma"
import { searching } from "../../../shared/searching";
import { doctorSearchFields } from "./doctor.constant";

const getAllDoctorFromDB = async (query: any) => {
    const { searchTerm } = query;
    let searchItems: Prisma.DoctorWhereInput[] = []

    searching(searchTerm, searchItems, doctorSearchFields)
    const orCondition: Prisma.DoctorWhereInput = { AND: searchItems }


    const result = await prisma.doctor.findMany({
        where: orCondition
    })
    console.log(result)
    return result
}

export const doctorServices = {
    getAllDoctorFromDB
}