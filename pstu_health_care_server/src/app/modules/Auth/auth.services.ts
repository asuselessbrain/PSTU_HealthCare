import { prisma } from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from "../../../healper/jwtHelper";
import AppError from "../../errors/AppError";
import status from "http-status";

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

    const accessToken = await createToken({ email: isUserExist.email, role: isUserExist.role }, "abcdefg", "15m")

    const refreshToken = await createToken({ email: isUserExist.email, role: isUserExist.role },  "abcdefghij", "30d")

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
        throw new AppError(status.UNAUTHORIZED,"Unauthorized Access!")
    }
    
    const accessToken = await createToken({ email: decoded.email, role: decoded.role }, "abcdefg", "15m")
    return { accessToken }
}

export const authServices = {
    logIn,
    generateTokenUsingRefreshToken
}