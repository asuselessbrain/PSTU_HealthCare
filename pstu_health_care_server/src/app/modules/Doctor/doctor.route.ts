import express from 'express';
import { doctorControllers } from './doctor.controller';
import { upload } from '../../../shared/imageUploader';
import { parseJson } from '../../middleWares/parseJson';

const router = express.Router();

router.get('/', doctorControllers.getAllDoctor)
router.get('/:id', doctorControllers.getSingleDoctor)
router.patch('/:id',
    upload.single('profileImg'),
    parseJson,
    doctorControllers.updateDoctor
)
router.patch('/soft/:id', doctorControllers.softDeleteDoctor)
router.delete('/:id', doctorControllers.hardDeleteDoctor)

export const doctorRoutes = router