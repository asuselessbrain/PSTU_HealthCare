import  express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { adminValidation } from './user.validation';
import { UserRole } from '../../../../generated/prisma';
import auth from '../../middleWares/auth';
import { upload } from '../../../shared/imageUploader';

const router = express.Router()

router.post("/", 
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    upload.single("profileImg"),
    (req: Request, res: Response, next: NextFunction)=>{
        req.body = JSON.parse(req.body.data)
        next()
    },
    validateRequest(adminValidation), 
    userControllers.createUser)

export const userRoutes = router