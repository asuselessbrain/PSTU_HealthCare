import express, { NextFunction, Request, Response } from 'express'
import { authController } from './auth.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { loginValidation } from './auth.validation';
import auth from '../../middleWares/auth';
import { UserRole } from '../../../../generated/prisma';

const router = express.Router()



router.post('/login', validateRequest(loginValidation), authController.logIn);
router.post('/generate-token', authController.generateTokenUsingRefreshToken);
router.post('/change-password', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), authController.changePassword);
export const authRoutes = router;