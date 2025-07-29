import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.services";
import pick from "../../../shared/pickFunction";
import { filterFieldArray, paginationAndSortingFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

// ! Get All Admin From DB Controller
const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = pick(req?.query, filterFieldArray);
        const options = pick(req?.query, paginationAndSortingFields)
        const result = await adminServices.getAllAdminFromDB(filter, options)
        sendResponse(res, {
            statusCode: status.OK,
            message: "Admin retrieved successfully!",
            meta: result.meta,
            data: result.result
        })
    }
    catch (err) {
        next(err)
    }
}

// ! Get Single Admin From DB using id Controller
const getSingleAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await adminServices.getSingleAdminFromDB(id)
        sendResponse(res, {
            statusCode: status.OK,
            message: "Specific admin retrieve successfully!",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}

// ! Update Admin Into DB Controller
const updateAdminInDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await adminServices.updateAdminInDB(id, req.body)
        sendResponse(res, {
            statusCode: status.OK,
            message: "Admin Updated Successfully",
            data: result
        })
    } catch (err) {
        next(err)
    }
}

// ! Hard Delete Admin From DB Controller
const hardDeleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await adminServices.hardDeleteAdminFromDB(id)
    sendResponse(res, {
        statusCode: status.OK,
        message: "Admin deleted successfully!",
        data: null
    })
}

const softDeleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        await adminServices.softDeleteAdminFromDB(id)
        sendResponse(res, {
            statusCode: status.OK,
            message: "Admin deleted Successfully",
            data: null
        })
    }
    catch (err) {
        next(err)
    }
}

export const adminControllers = {
    getAllAdmin,
    getSingleAdmin,
    updateAdminInDB,
    hardDeleteAdmin
}