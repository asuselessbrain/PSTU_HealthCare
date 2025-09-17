import express from 'express';
import { patientController } from './patient.controller';
import auth from '../../middleWares/auth';
import { UserRole } from '../../../../generated/prisma';

const router = express.Router()

router.get('/', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), patientController.getAllPatientFromDB)

export const patientRouters = router