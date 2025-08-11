import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { doctorServices } from "./doctor.services";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import pick from "../../../shared/pickFunction";
import { paginationAndSortingFields } from "../Admin/admin.constant";

const getAllDoctor = catchAsync(async(req: Request, res: Response) => {
    const query = req.query;

    const result = await doctorServices.getAllDoctorFromDB(query)

    sendResponse(res, {
        statusCode: status.OK,
        message: "Doctor retrieve successfully!",
        data: result
    })
})

export const doctorControllers = {
    getAllDoctor
}