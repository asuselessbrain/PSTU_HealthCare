import status from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { patientServices } from "./patient.services";
import { Request, Response } from "express";

const getAllPatientFromDB = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await patientServices.getAllPatientFromDB(query)
    sendResponse(res, {
        statusCode: status.OK,
        message: "Patient retrieve successfully!",
        data: result
    })
})

const softDeletePatient = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await patientServices.softDeletePatientFromDB(id)

    sendResponse(res, {
        statusCode: status.OK,
        message: "Patient deleted successfully!",
        data: result
    })
})

const getSinglePatientInfoFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await patientServices.getSinglePatientInfoFromDB(id)

    sendResponse(res, {
        statusCode: status.OK,
        message: "Patient retrieve successfully!",
        data: result
    })
})

const updatePatientIntoDB = catchAsync(async(req: Request, res: Response)=>{
    const {id} = req.params;

    const result = await patientServices.updatePatient(id)

    sendResponse(res,{
        statusCode: status.OK,
        message: "Patient updated successfully!",
        data: result
    })
})
export const patientController = {
    getAllPatientFromDB,
    softDeletePatient,
    getSinglePatientInfoFromDB,
    updatePatientIntoDB
}