import express from 'express';
import { doctorControllers } from './doctor.controller';

const router = express.Router();

router.get('/', doctorControllers.getAllDoctor)

export const doctorRoutes = router