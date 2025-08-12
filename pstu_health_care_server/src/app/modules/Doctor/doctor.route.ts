import express from 'express';
import { doctorControllers } from './doctor.controller';

const router = express.Router();

router.get('/', doctorControllers.getAllDoctor)
router.get('/:id', doctorControllers.getSingleDoctor)
router.patch('/:id', doctorControllers.updateDoctor)
router.patch('/soft/:id', doctorControllers.softDeleteDoctor)
router.delete('/:id', doctorControllers.hardDeleteDoctor)

export const doctorRoutes = router