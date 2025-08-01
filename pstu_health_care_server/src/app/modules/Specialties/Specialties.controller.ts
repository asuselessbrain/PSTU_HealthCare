import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { specialtiesServices } from "./Specialties.service";
import { IFile } from "../../../interfaces/file";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createSpecialties = catchAsync(async (req: Request, res: Response) => {
    const result = await specialtiesServices.createSpecialtiesInDB(req.file as IFile, req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Specialties created successfully!",
        data: result
    })
})

const updateSpecialties = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await specialtiesServices.updateSpecialtiesInDB(req.file as IFile, id, req.body)
    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Specialties updated successfully!",
        data: result
    })
})

export const specialtiesControllers = {
    createSpecialties,
    updateSpecialties
}