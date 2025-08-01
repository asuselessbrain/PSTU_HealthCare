import type { StringValue } from 'ms';
import { prisma } from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { createToken, verify } from "../../../healper/jwtHelper";
import AppError from "../../errors/AppError";
import status from "http-status";
import { config } from "../../../config";
import { UserStatus } from '../../../../generated/prisma';
import sendEmail from '../../../shared/sendEmail';
import path from 'path';



const logIn = async (payload: { email: string, password: string }) => {
    const isUserExist = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
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
        decoded = await verify(token, config.jwt.refresh_token_secret as Secret) as JwtPayload
    } catch (err) {
        throw new AppError(status.UNAUTHORIZED, "Unauthorized Access!")
    }

    const accessToken = await createToken({ email: decoded.email, role: decoded.role }, config.jwt.access_token_secret as Secret, config.jwt.access_token_expire_in as StringValue)
    return { accessToken }
}

const changePassword = async (email: string, payload: { oldPassword: string, newPassword: string }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email,
            status: UserStatus.ACTIVE
        }
    })

    const isOldPasswordMatched = await bcrypt.compare(payload.oldPassword, userData.password)

    if (!isOldPasswordMatched) {
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

const forgetPassword = async (payload: { email: string }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    const resetPasswordToken = await createToken({ email: userData?.email, role: userData?.role }, config.jwt.rest_password_token_secret as Secret, config.jwt.rest_password_token_expire_in as StringValue)

    const resetPasswordLink = config.reset_password_frontend_link + `?id=${userData.id}&token=${resetPasswordToken}`

    sendEmail(
        userData.email,
        "Reset Your Password - Action Required",
        `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Password Reset Request</h2>
    <p>Hello User,</p>

    <p>We received a request to reset the password for your account associated with this email address.</p>

    <p>Please click the button below to reset your password:</p>

    <a href="${resetPasswordLink}" 
       style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
       Reset Password
    </a>

    <p>If the button above doesn't work, copy and paste the following URL into your browser:</p>
    <p style="word-break: break-all;">${resetPasswordLink}</p>

    <p><strong>Note:</strong> This link will expire in 5 minutes for security reasons.</p>

    <p>If you did not request a password reset, please ignore this email. Your account is still secure.</p>

    <p>Best regards,<br>The Support Team</p>
  </div>
  `
    );

}

const resetPassword = async(token: string, payload: {password: string})=>{
    const verifyToken = await verify(token, config.jwt.rest_password_token_secret as Secret) as JwtPayload

    await prisma.user.findUniqueOrThrow({
        where: {
            email: verifyToken.email,
            status: UserStatus.ACTIVE
        }
    })

    const hashedPassword = await bcrypt.hash(payload.password, Number(config.salt_rounds))
    
    const updatePassword = await prisma.user.update({
        where: {
            email: verifyToken.email,
            status: UserStatus.ACTIVE
        },
        data:{
            password: hashedPassword
        }
    })
    return updatePassword
}

export const authServices = {
    logIn,
    generateTokenUsingRefreshToken,
    changePassword,
    forgetPassword,
    resetPassword
}