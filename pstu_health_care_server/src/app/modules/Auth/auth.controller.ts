import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { authServices } from "./auth.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const logIn = catchAsync(async(req: Request, res: Response)=>{
    const result = await authServices.logIn(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        message: "User logged in successfully!",
        data: result
    })
})

export const authController = {
    logIn
}