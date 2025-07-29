import { Request, Response } from "express";
import { adminServices } from "./admin.services";
import pick from "../../../shared/pickFunction";

const getAllAdmin = async (req: Request, res: Response) => {
    try {
        const filter = pick(req.query, ["name", "email", "contactNumber", "searchTerm"]);
        const options = pick(req.query, ["page", "limit"])
        const result = await adminServices.getAllAdminFromDB(filter, options)
        res.status(200).json({
            success: true,
            message: "Admin retrieved successfully!",
            data: result
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