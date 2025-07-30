import  express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { adminValidation } from './user.validation';
import { UserRole } from '../../../../generated/prisma';
import auth from '../../middleWares/auth';

const router = express.Router()

router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(adminValidation), userControllers.createUser)

export const userRoutes = router