import express from 'express';
import { adminControllers } from './admin.controller';
const router = express.Router();

router.get('/', adminControllers.getAllAdmin)
router.get('/:id', adminControllers.getSingleAdmin)

export const adminRoutes = router