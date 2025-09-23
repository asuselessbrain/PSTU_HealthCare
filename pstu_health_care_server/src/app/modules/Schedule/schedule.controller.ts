import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { scheduleServices } from "./schedule.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createScheduleInDB = catchAsync(async (req: Request, res: Response) => {
    const result = await scheduleServices.createScheduleInDB(req.body)

    sendResponse(res, {
        statusCode: status.CREATED,
        message: "Schedule created successfully",
        data: result
    })
})

export const scheduleController = {
    createScheduleInDB
}