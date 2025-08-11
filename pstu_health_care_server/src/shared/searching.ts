import { Prisma } from "../../generated/prisma"

export const searching = async (searchTerm: string, searchItems: Prisma.DoctorWhereInput[], searchFields: string[]) => {
    if (searchTerm) {
        return searchItems.push(
            {
                OR: searchFields.map(item => ({ [item]: { contains: searchTerm, mode: "insensitive" } }))
            }
        )
    }
}