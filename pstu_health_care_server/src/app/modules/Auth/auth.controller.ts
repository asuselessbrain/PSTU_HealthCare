import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { authServices } from "./auth.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const logIn = catchAsync(async(req: Request, res: Response)=>{
    const result = await authServices.logIn(req.body);
    const {refreshToken} = result;
    res.cookie('refreshToken', refreshToken, {secure: false, httpOnly: true})
    sendResponse(res, {
        statusCode: status.OK,
        message: "User logged in successfully!",
        data: {
            accessToken: result.accessToken,
            needPasswordChanged: result.needPasswordChanged
        }
    })
})

const generateTokenUsingRefreshToken = catchAsync(async(req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    const result = await authServices.generateTokenUsingRefreshToken(refreshToken)
    sendResponse(res, {
        statusCode: status.OK,
        message: "Access token generated successfully!",
        data: result
    })
})

const changePassword = catchAsync(async(req :Request&{user?: any}, res: Response) => {
    const {email} = req.user;
    const result = await authServices.changePassword(email, req?.body)
    sendResponse(res, {
        statusCode: status.OK,
        message: "Password changed successfully!",
        data: result
    })
})

const forgetPassword = catchAsync(async(req :Request, res: Response) =>{
    const result = await authServices.forgetPassword(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: "Reset password link send to your email!",
        data: result
    })
})

export const authControllers = {
    logIn,
    generateTokenUsingRefreshToken,
    changePassword,
    forgetPassword
}