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
    const refreshToken = req.cookies
    console.log(refreshToken)
    // const result = await authServices.generateTokenUsingRefreshToken()
})

export const authController = {
    logIn
}