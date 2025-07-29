import { prisma } from "../../../shared/prisma";
import bcrypt from 'bcrypt';;

const logIn = async(payload: {email: string, password: string}) => {
    const isUserExist = await prisma.user.findUniqueOrThrow({
        where : {
            email: payload.email
        }
    })
    
    const isPasswordMarched = await bcrypt.compare(payload.password, isUserExist.password)
    
    if(!isPasswordMarched){
        throw new Error("Email or password does not matched!")
    }

    
}

export const authServices = {
    logIn
}