import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { IFile } from "../../../interfaces/file";
import pick from "../../../shared/pickFunction";
import { paginationAndSortingFields } from "../Admin/admin.constant";
import { filterFields } from "./user.constrant";

const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createAdminInDB(req.file as IFile, req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Admin created successfully!",
        data: result
    })
})

const createDoctor = catchAsync(async(req: Request, res :Response)=>{
    const result = await userServices.createDoctorInDB(req.file as IFile, req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Doctor created successfully!",
        data: result
    })
})

const createPatient = catchAsync(async(req: Request, res :Response)=>{
    const result = await userServices.createPatientInDB(req.file as IFile, req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Patient created successfully!",
        data: result
    })
})

const getAllUser = catchAsync(async(req: Request, res :Response)=>{
    const filter = pick(req?.query, filterFields);
    const options = pick(req?.query, paginationAndSortingFields)
    const result = await userServices.getAllUserFromDB(filter, options)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "User retrieve successfully!",
        meta: result.meta,
        data: result.result
    })
})

export const userControllers = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllUser
}