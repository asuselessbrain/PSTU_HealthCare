import express, { NextFunction, Request, Response } from 'express';
import { userControllers } from './user.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { adminValidation, doctorValidation, patientValidation } from './user.validation';
import { UserRole } from '../../../../generated/prisma';
import auth from '../../middleWares/auth';
import { upload } from '../../../shared/imageUploader';
import { parseJson } from '../../middleWares/parseJson';

const router = express.Router()

// ! Get All User Info
router.get("/all-user",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    userControllers.getAllUser
)

// ! Get My Profile Info
router.get("/my-profile",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    userControllers.myProfile
)

// ! Create Admin
router.post("/create-admin",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    upload.single("profileImg"),
    parseJson,
    validateRequest(adminValidation),
    userControllers.createAdmin);

// ! Create Doctor
router.post("/create-doctor",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    upload.single("profileImg"),
    parseJson,
    validateRequest(doctorValidation),
    userControllers.createDoctor);

// ! Create Patient
router.post("/create-patient",
    upload.single("profileImg"),
    parseJson,
    validateRequest(patientValidation),
    userControllers.createPatient
)

// ! Update User status
router.patch("/update-status",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    userControllers.updateStatus
)

// ! Update my Profile
router.patch("/update-my-profile",
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    upload.single("profileImg"),
    parseJson,
    userControllers.updateMyProfile
)

export const userRoutes = router