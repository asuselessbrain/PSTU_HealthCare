import express from 'express';
import auth from '../../middleWares/auth';
import { UserRole } from '../../../../generated/prisma';
import { specialtiesControllers } from './Specialties.controller';
const router = express.Router()

router.post("/create-specialties", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), specialtiesControllers.createSpecialties)
export const specialtiesRouter = router