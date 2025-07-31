import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { adminValidation } from './user.validation';
import { UserRole } from '../../../../generated/prisma';
import auth from '../../middleWares/auth';
import { upload } from '../../../shared/imageUploader';
import { parseAsyncMiddleWare } from '../../middleWares/parseAsync';

const router = express.Router()


router.post("/create-admin",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    upload.single("profileImg"),
    parseAsyncMiddleWare,
    validateRequest(adminValidation),
    userControllers.createAdmin);

export const userRoutes = router