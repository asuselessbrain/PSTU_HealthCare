"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/Users/user.route");
const admin_route_1 = require("../modules/Admin/admin.route");
const router = express_1.default.Router();
const routes = [
    {
        path: "/user",
        route: user_route_1.userRoutes
    },
    {
        path: "/admin",
        route: admin_route_1.adminRoutes
    },
];
routes.forEach(route => router.use(route.path, route.route));
exports.default = router;
