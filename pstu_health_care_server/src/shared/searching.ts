import { Prisma } from "../../generated/prisma"

export const searching = async <T extends Record<string, any>>(searchTerm: string, searchItems: T, searchFields: string[]) => {
    if (searchTerm) {
        return searchItems.push(
            {
                OR: searchFields.map(item => ({ [item]: { contains: searchTerm, mode: "insensitive" } }))
            }
        )
    }
}