import type { StringValue } from 'ms';
import { prisma } from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { createToken } from "../../../healper/jwtHelper";
import AppError from "../../errors/AppError";
import status from "http-status";
import { config } from "../../../config";
import { UserStatus } from '../../../../generated/prisma';

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

    const accessToken = await createToken({ email: isUserExist.email, role: isUserExist.role }, config.jwt.access_token_secret as Secret, config.jwt.access_token_expire_in as StringValue)

    const refreshToken = await createToken({ email: isUserExist.email, role: isUserExist.role }, config.jwt.refresh_token_secret as Secret, config.jwt.refresh_token_expire_in as StringValue)

    return {
        accessToken,
        refreshToken,
        needPasswordChanged: isUserExist.needPasswordChange
    }
}

const generateTokenUsingRefreshToken = async (token: string) => {
    let decoded
    try {
        decoded = jwt.verify(token, config.jwt.refresh_token_secret as Secret) as JwtPayload
    } catch (err) {
        throw new AppError(status.UNAUTHORIZED, "Unauthorized Access!")
    }

    const accessToken = await createToken({ email: decoded.email, role: decoded.role }, config.jwt.access_token_secret as Secret, config.jwt.access_token_expire_in as StringValue)
    return { accessToken }
}

const changePassword = async(email: string, payload: {oldPassword: string, newPassword: string})=>{
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email,
            status: UserStatus.ACTIVE
        }
    })
    
    const isOldPasswordMatched = await bcrypt.compare(payload.oldPassword, userData.password)
    
    if(!isOldPasswordMatched){
        throw new AppError(status.BAD_REQUEST, "Password does not matched!")
    }

    const hashedPassword = await bcrypt.hash(payload.newPassword, Number(config.salt_rounds))

    const result = await prisma.user.update({
        where: {
            email,
            status: UserStatus.ACTIVE
        },
        data: {
            password: hashedPassword,
            needPasswordChange: false
        }
    })
    return result
}

export const authServices = {
    logIn,
    generateTokenUsingRefreshToken,
    changePassword
}