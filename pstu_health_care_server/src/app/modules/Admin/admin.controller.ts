import { Request, Response } from "express";
import { adminServices } from "./admin.services";
import pick from "../../../shared/pickFunction";
import { filterFieldArray, paginationAndSortingFields } from "./admin.constant";

const getAllAdmin = async (req: Request, res: Response) => {
    try {
        const filter = pick(req.query, filterFieldArray);
        const options = pick(req.query, paginationAndSortingFields)
        const result = await adminServices.getAllAdminFromDB(filter, options)
        res.status(200).json({
            success: true,
            message: "Admin retrieved successfully!",
            meta: result.meta,
            data: result.result
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: (err as Error)?.message || "Something went wrong",
            error: err
        })
    }
}

export const adminControllers = {
    getAllAdmin
}