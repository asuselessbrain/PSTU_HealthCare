import express from 'express';
import { userRoutes } from '../modules/Users/user.route';
import { adminRoutes } from '../modules/Admin/admin.route';
import { authRoutes } from '../modules/Auth/auth.route';
import { specialtiesRoutes } from '../modules/Specialties/Specialties.route';
import { doctorRoutes } from '../modules/Doctor/doctor.route';
import { patientRouters } from '../modules/Patient/patient.route';
import { scheduleRouter } from '../modules/Schedule/schedule.route';
const router = express.Router();

const routes = [
    {
        path: "/user",
        route: userRoutes
    },
    {
        path: "/admin",
        route: adminRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/specialties",
        route: specialtiesRoutes
    },
    {
        path: "/doctors",
        route: doctorRoutes
    },
    {
        path: "/patients",
        route: patientRouters
    },
    {
        path: "/schedules",
        route: scheduleRouter
    }
]

routes.forEach(route => router.use(route.path, route.route))

export default router;