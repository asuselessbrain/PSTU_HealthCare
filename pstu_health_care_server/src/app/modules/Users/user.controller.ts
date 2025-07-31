import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { catchAsync } from "../../../shared/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createAdminInDB(req.file!, req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Admin created successfully!",
        data: result
    })
})

const createDoctor = catchAsync(async(req: Request, res :Response)=>{
    const result = await userServices.createDoctorInDB(req.file, req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Doctor created successfully!",
        data: result
    })
})

export const userControllers = {
    createAdmin,
    createDoctor
}