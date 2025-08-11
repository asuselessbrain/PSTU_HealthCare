import express from 'express';
import { doctorControllers } from './doctor.controller';

const router = express.Router();

router.get('/', doctorControllers.getAllDoctor)
router.get('/:id', doctorControllers.getSingleDoctor)
router.delete('/:id', doctorControllers.hardDeleteDoctor)

export const doctorRoutes = router