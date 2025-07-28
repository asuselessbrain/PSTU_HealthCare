import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
    const result = await userServices.createUserInDB()
    res.status(201).json({
        success: true,
        message: "Admin created successfully!",
        data: result
    })
}

export const userControllers = {
    createUser
}