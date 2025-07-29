import  express, { Request, Response } from 'express';
import { userControllers } from './user.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { adminValidation } from './user.validation';
const router = express.Router()

router.post("/", validateRequest(adminValidation), userControllers.createUser)

export const userRoutes = router