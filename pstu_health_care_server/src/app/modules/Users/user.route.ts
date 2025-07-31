import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { adminValidation, doctorValidation, patientValidation } from './user.validation';
import { UserRole } from '../../../../generated/prisma';
import auth from '../../middleWares/auth';
import { upload } from '../../../shared/imageUploader';
import { parseJson } from '../../middleWares/parseJson';

const router = express.Router()


router.post("/create-admin",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    upload.single("profileImg"),
    parseJson,
    validateRequest(adminValidation),
    userControllers.createAdmin);

router.post("/create-doctor",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    upload.single("profileImg"),
    parseJson,
    validateRequest(doctorValidation),
    userControllers.createDoctor);

router.post("/create-patient", 
    upload.single("profileImg"),
    parseJson,
    validateRequest(patientValidation),
    userControllers.createPatient
)

export const userRoutes = router