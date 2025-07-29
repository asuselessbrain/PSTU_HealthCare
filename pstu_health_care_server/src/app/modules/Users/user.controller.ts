import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userServices.createUserInDB(req.body)
        sendResponse(res, {
            statusCode: status.CREATED,
            message: "Admin created successfully!",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}

export const userControllers = {
    createUser
}