import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { catchAsync } from "../../../shared/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createUserInDB(req.file!, req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Admin created successfully!",
        data: result
    })
})

export const userControllers = {
    createUser
}