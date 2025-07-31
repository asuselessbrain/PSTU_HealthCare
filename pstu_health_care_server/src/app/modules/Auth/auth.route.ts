import express, { NextFunction, Request, Response } from 'express'
import { authControllers } from './auth.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { loginValidation } from './auth.validation';
import auth from '../../middleWares/auth';
import { UserRole } from '../../../../generated/prisma';

const router = express.Router()



router.post('/login', validateRequest(loginValidation), authControllers.logIn);
router.post('/generate-token', authControllers.generateTokenUsingRefreshToken);
router.post('/change-password', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), authControllers.changePassword);
router.post('/forget-password', authControllers.forgetPassword)
router.post('/reset-password', authControllers.resetPassword)

export const authRoutes = router;