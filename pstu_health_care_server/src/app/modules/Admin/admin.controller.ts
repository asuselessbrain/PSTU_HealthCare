import { Request, Response } from "express";
import { adminServices } from "./admin.services";

const getAllAdmin = async(req: Request, res: Response) => {
    const result = await adminServices.getAllAdminFromDB()
    res.status(200).json({
        success: true,
        message: "Admin retrieved successfully!",
        data: result
    })
}