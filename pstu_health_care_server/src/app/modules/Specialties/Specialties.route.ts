import express from 'express';
import auth from '../../middleWares/auth';
import { UserRole } from '../../../../generated/prisma';
import { specialtiesControllers } from './Specialties.controller';
import { upload } from '../../../shared/imageUploader';
import { parseJson } from '../../middleWares/parseJson';
const router = express.Router()

router.post("/create-specialties",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    upload.single("icon"),
    parseJson,
    specialtiesControllers.createSpecialties
)

router.post("/create-specialties",
    auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    upload.single("icon"),
    parseJson,
    specialtiesControllers.updateSpecialties
)
export const specialtiesRoutes = router