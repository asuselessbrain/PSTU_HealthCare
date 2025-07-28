import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const result = await userServices.createUserInDB(req.body)
    res.status(201).json({
        success: true,
        message: "Admin created successfully!",
        data: result
    })
}

export const userControllers = {
    createUser
}