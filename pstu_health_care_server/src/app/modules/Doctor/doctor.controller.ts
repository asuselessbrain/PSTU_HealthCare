import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { doctorServices } from "./doctor.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const getAllDoctor = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;

    const result = await doctorServices.getAllDoctorFromDB(query)

    sendResponse(res, {
        statusCode: status.OK,
        message: "Doctor retrieve successfully!",
        data: result
    })
})

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await doctorServices.getSingleDoctorFromDB(id)

    sendResponse(res, {
        statusCode: status.OK,
        message: "Doctor retrieve successfully!",
        data: result
    })
})

const hardDeleteDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await doctorServices.hardDeleteDoctorFromDB(id)

    sendResponse(res, {
        statusCode: status.OK,
        message: "Doctor deleted successfully!",
        data: result
    })
})

const softDeleteDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await doctorServices.softDeleteDoctorFromDB(id)

    sendResponse(res, {
        statusCode: status.OK,
        message: "Doctor deleted successfully!",
        data: result
    })
})

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const file = req.file;

    const result = await doctorServices.updateDoctorInDB(file, payload,id)

    sendResponse(res, {
        statusCode: status.OK,
        message: "Doctor updated successfully!",
        data: result
    })
})

export const doctorControllers = {
    getAllDoctor,
    getSingleDoctor,
    hardDeleteDoctor,
    softDeleteDoctor,
    updateDoctor
}