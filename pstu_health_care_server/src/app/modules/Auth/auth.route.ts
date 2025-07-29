import express from 'express'
import { authController } from './auth.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { loginValidation } from './auth.validation';

const router = express.Router()

router.post('/login', validateRequest(loginValidation), authController.logIn)
export const authRoutes = router;