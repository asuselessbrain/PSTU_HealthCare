import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { specialtiesServices } from "./Specialties.service";
import { IFile } from "../../../interfaces/file";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import pick from "../../../shared/pickFunction";
import { paginationAndSortingFields } from "../Admin/admin.constant";

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

const getSpecialties = catchAsync(async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm
    const options = pick(req.query, paginationAndSortingFields)
    const result = await specialtiesServices.getAllSpecialtiesFromDb(searchTerm, options)
    sendResponse(res, {
        statusCode: status.OK,
        message: "Specialties retrieve successfully!",
        data: result
    })
})

export const specialtiesControllers = {
    createSpecialties,
    updateSpecialties,
    getSpecialties
}