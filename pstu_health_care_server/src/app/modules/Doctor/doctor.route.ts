import express from 'express';
import { doctorControllers } from './doctor.controller';

const router = express.Router();

router.get('/', doctorControllers.getAllDoctor)
router.get('/:id', doctorControllers.getSingleDoctor)
router.delete('/:id', doctorControllers.hardDeleteDoctor)
router.patch('/:id', doctorControllers.softDeleteDoctor)

export const doctorRoutes = router