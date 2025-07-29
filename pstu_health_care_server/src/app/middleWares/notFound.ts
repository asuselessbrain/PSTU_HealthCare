import { Request, Response } from "express";
import status from "http-status";

const notFound = async(req: Request, res: Response) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND",
        error: {path: req.originalUrl, errorMessage: "The path is not found that you provided"}
    })
}

export default notFound