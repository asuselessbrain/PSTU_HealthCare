import status from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { patientServices } from "./patient.services";
import { Request, Response } from "express";

const getAllPatientFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await patientServices.getAllPatientFromDB()
    sendResponse(res, {
        statusCode: status.OK,
        message: "Doctor retrieve successfully!",
        data: result
    })
})

export const patientController = {
    getAllPatientFromDB
}