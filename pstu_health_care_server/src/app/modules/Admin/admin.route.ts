import express from 'express';
import { adminControllers } from './admin.controller';
const router = express.Router();

// ! Get All Admin From DB route
router.get('/', adminControllers.getAllAdmin)
// ! Get Single Admin From DB using id route
router.get('/:id', adminControllers.getSingleAdmin)
// ! Update Admin Into DB route
router.patch('/:id', adminControllers.updateAdminInDB)
// ! Hard Delete Admin From DB route
router.delete('/:id', adminControllers.hardDeleteAdmin)

export const adminRoutes = router