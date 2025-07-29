import { prisma } from "../../../shared/prisma"

const logIn = async(payload: {email: string, password: string}) => {
    const isUserExist = prisma.user.findUnique({
        where : {
            email: payload.email
        }
    })
    console.log(isUserExist)
}