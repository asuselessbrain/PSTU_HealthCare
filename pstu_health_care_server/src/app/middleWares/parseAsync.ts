import { NextFunction, Request, Response } from "express";

export const parseAsyncMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = JSON.parse(req.body.data)
        next()
    } catch (err) {
        res.status(400).json({ message: 'Invalid JSON in body.data' });
    }
}