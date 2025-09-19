import express from 'express';
import { patientController } from './patient.controller';
import auth from '../../middleWares/auth';
import { UserRole } from '../../../../generated/prisma';

const router = express.Router()

router.get('/', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), patientController.getAllPatientFromDB)
router.patch('/soft/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.PATIENT), patientController.softDeletePatient)
router.get('/single-patient/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.PATIENT, UserRole.DOCTOR), patientController.getSinglePatientInfoFromDB)


export const patientRouters = router