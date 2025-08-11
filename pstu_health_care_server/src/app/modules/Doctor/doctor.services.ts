
import { Prisma } from "../../../../generated/prisma";
import { filtering } from "../../../shared/filtering";
import { prisma } from "../../../shared/prisma"
import { searching } from "../../../shared/searching";
import { doctorSearchFields } from "./doctor.constant";

const getAllDoctorFromDB = async (query: any) => {
    const { searchTerm, ...filterData } = query;
    let searchItems: Prisma.DoctorWhereInput[] = []
    if (searchTerm) {
        searching(searchTerm, searchItems, doctorSearchFields)
    }

    if (Object.keys(filterData).length > 0) {
        filtering(searchItems, filterData)

    }
    const orCondition: Prisma.DoctorWhereInput = { AND: searchItems }


    const result = await prisma.doctor.findMany({
        where: orCondition
    })
    return result
}

export const doctorServices = {
    getAllDoctorFromDB
}