import express, { NextFunction, Request, Response } from 'express'
import { authController } from './auth.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { loginValidation } from './auth.validation';

const router = express.Router()



router.post('/login', validateRequest(loginValidation), authController.logIn);
router.post('/generate-token', authController.generateTokenUsingRefreshToken)
export const authRoutes = router;