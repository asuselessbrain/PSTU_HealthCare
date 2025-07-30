import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import status from "http-status";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { config } from "../../config";
import { prisma } from "../../shared/prisma";
import { UserStatus } from "../../../generated/prisma";

const auth =(...roles: string[]) => {
    return async(req: Request & {user?: any}, res: Response, next: NextFunction)=>{
        const token = req.headers.authorization;

        if(!token){
            throw new AppError(status.UNAUTHORIZED, "You are not authorized")
        }

        let decoded;

        try{
            decoded = jwt.verify(token, config.jwt.access_token_secret as Secret) as JwtPayload
        } catch(err){
            next(err)
        }

        const userData = await prisma.user.findUniqueOrThrow({
            where: {
                email: decoded?.email,
                status: UserStatus.ACTIVE
            }
        })

        if(roles.length && !roles.includes(decoded?.role)){
            throw new AppError(status.UNAUTHORIZED, "Unauthorized access")
        }
        req.user = decoded
        next()
    }
}

export default auth;