import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminServices } from "./admin.services";
import pick from "../../../shared/pickFunction";
import { filterFieldArray, paginationAndSortingFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { catchAsync } from "../../../shared/catchAsync";

// ! Get All Admin From DB Controller
const getAllAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const filter = pick(req?.query, filterFieldArray);
    const options = pick(req?.query, paginationAndSortingFields)
    const result = await adminServices.getAllAdminFromDB(filter, options)
    sendResponse(res, {
        statusCode: status.OK,
        message: "Admin retrieved successfully!",
        meta: result.meta,
        data: result.result
    })
})

// ! Get Single Admin From DB using id Controller
const getSingleAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await adminServices.getSingleAdminFromDB(id)
    sendResponse(res, {
        statusCode: status.OK,
        message: "Specific admin retrieve successfully!",
        data: result
    })
})

// ! Update Admin Into DB Controller
const updateAdminInDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await adminServices.updateAdminInDB(id, req.body)
    sendResponse(res, {
        statusCode: status.OK,
        message: "Admin Updated Successfully",
        data: result
    })
})

// ! Hard Delete Admin From DB Controller
const hardDeleteAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await adminServices.hardDeleteAdminFromDB(id)
    sendResponse(res, {
        statusCode: status.OK,
        message: "Admin deleted successfully!",
        data: null
    })
})

// ! Soft Delete Admin From DB Controller
const softDeleteAdmin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        await adminServices.softDeleteAdminFromDB(id)
        sendResponse(res, {
            statusCode: status.OK,
            message: "Admin deleted Successfully",
            data: null
        })
    }
)

export const adminControllers = {
    getAllAdmin,
    getSingleAdmin,
    updateAdminInDB,
    hardDeleteAdmin,
    softDeleteAdmin
}