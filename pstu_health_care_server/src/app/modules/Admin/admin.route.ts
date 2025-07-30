import express, { NextFunction, Request, Response } from 'express';
import { adminControllers } from './admin.controller';
import { validateRequest } from '../../middleWares/validateRequest';
import { validateUpdateAdmin } from './admin.validation';
import auth from '../../middleWares/auth';
import { UserRole } from '../../../../generated/prisma';
const router = express.Router();

// ! Get All Admin From DB route
router.get('/', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminControllers.getAllAdmin)
// ! Get Single Admin From DB using id route
router.get('/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminControllers.getSingleAdmin)
// ! Update Admin Into DB route
router.patch('/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(validateUpdateAdmin), adminControllers.updateAdminInDB)
// ! Hard Delete Admin From DB route
router.delete('/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminControllers.hardDeleteAdmin)
// ! Soft Delete Admin From DB route
router.patch('/soft/:id', auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminControllers.softDeleteAdmin)

export const adminRoutes = router