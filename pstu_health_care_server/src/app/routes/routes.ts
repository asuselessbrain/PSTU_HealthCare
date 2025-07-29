import express from 'express';
import { userRoutes } from '../modules/Users/user.route';
import { adminRoutes } from '../modules/Admin/admin.route';
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
    
]

routes.forEach(route=> router.use(route.path, route.route))

export default router;