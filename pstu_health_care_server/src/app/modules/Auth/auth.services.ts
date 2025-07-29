import { prisma } from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from "../../../healper/jwtHelper";

const logIn = async (payload: { email: string, password: string }) => {
    const isUserExist = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    const isPasswordMarched = await bcrypt.compare(payload.password, isUserExist.password)

    if (!isPasswordMarched) {
        throw new Error("Email or password does not matched!")
    }

    const accessToken = createToken({ email: isUserExist.email, role: isUserExist.role }, "abcdefg", "15m")

    const refreshToken = createToken({ email: isUserExist.email, role: isUserExist.role },  "abcdefghij", "30d")

    return {
        accessToken,
        refreshToken,
        needPasswordChanged: isUserExist.needPasswordChange
    }
}

const generateTokenUsingRefreshToken = async (token: string) => {
    let decoded
    try{
        decoded = jwt.verify(token, "abcdefghij") as JwtPayload
    }catch(err){
        throw new Error("Unauthorized Access!")
    }
    
    const accessToken = createToken({ email: decoded.email, role: decoded.role }, "abcdefg", "15m")
    return { accessToken }
}

export const authServices = {
    logIn,
    generateTokenUsingRefreshToken
}