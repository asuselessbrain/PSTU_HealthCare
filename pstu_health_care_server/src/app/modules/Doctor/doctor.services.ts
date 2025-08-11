
import { Prisma } from "../../../../generated/prisma";
import { prisma } from "../../../shared/prisma"
import { searching } from "../../../shared/searching";
import { doctorSearchFields } from "./doctor.constant";

const getAllDoctorFromDB = async (query: any) => {
    const { searchTerm } = query;
    // console.log(searchTerm)
    let searchItems: Prisma.DoctorWhereInput[] = []

    // if (query.searchTerm) {
    //     searchItems.push({
    //         OR: doctorSearchFields.map(item => ({
    //             [item]: {
    //                 contains: query.searchTerm,
    //                 mode: "insensitive"
    //             }
    //         }))
    //     })
    // }
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