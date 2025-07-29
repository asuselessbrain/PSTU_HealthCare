import express, { NextFunction, Request, Response } from 'express';
import { adminControllers } from './admin.controller';
import { z } from 'zod';
import { validateRequest } from '../../middleWares/validateRequest';
import { validateUpdateAdmin } from './admin.validation';
const router = express.Router();

// ! Get All Admin From DB route
router.get('/', adminControllers.getAllAdmin)
// ! Get Single Admin From DB using id route
router.get('/:id', adminControllers.getSingleAdmin)
// ! Update Admin Into DB route
router.patch('/:id', validateRequest(validateUpdateAdmin), adminControllers.updateAdminInDB)
// ! Hard Delete Admin From DB route
router.delete('/:id', adminControllers.hardDeleteAdmin)
// ! Soft Delete Admin From DB route
router.patch('/soft/:id', adminControllers.softDeleteAdmin)

export const adminRoutes = router