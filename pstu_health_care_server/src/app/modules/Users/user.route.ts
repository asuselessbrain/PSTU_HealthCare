import  express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { adminValidation } from './user.validation';
import AppError from '../../errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { config } from '../../../config';
import { UserRole, UserStatus } from '../../../../generated/prisma';
import { prisma } from '../../../shared/prisma';

const router = express.Router()

const auth =(...roles: string[]) => {
    return async(req: Request, res: Response, next: NextFunction)=>{
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
        next()
    }
}

router.post("/", auth(UserRole.ADMIN), validateRequest(adminValidation), userControllers.createUser)

export const userRoutes = router