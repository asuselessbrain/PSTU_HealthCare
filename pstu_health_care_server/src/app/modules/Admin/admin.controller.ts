import { NextFunction, Request, Response } from "express";
import { adminServices } from "./admin.services";
import pick from "../../../shared/pickFunction";
import { filterFieldArray, paginationAndSortingFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = pick(req?.query, filterFieldArray);
        const options = pick(req?.query, paginationAndSortingFields)
        const result = await adminServices.getAllAdminFromDB(filter, options)
        sendResponse(res, {
            statusCode: 200,
            message: "Admin retrieved successfully!",
            meta: result.meta,
            data: result.result
        })
    }
    catch (err) {
        next(err)
    }
}

const getSingleAdmin = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const result = await adminServices.getSingleAdminFromDB(id)
        sendResponse(res, {
            statusCode: 200,
            message: "Specific admin retrieve successfully!",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}

export const adminControllers = {
    getAllAdmin,
    getSingleAdmin
}