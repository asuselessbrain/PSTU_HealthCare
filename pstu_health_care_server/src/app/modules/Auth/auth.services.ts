import { prisma } from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

    const accessToken = jwt.sign({email: isUserExist.email, role: isUserExist.role}, "abcdefg", {algorithm: "HS256", expiresIn: "15m"})
    console.log(accessToken)
}

export const authServices = {
    logIn
}