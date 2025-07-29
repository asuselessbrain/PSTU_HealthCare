"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
// ! Get All Admin From DB route
router.get('/', admin_controller_1.adminControllers.getAllAdmin);
// ! Get Single Admin From DB using id route
router.get('/:id', admin_controller_1.adminControllers.getSingleAdmin);
// ! Update Admin Into DB route
router.patch('/:id', admin_controller_1.adminControllers.updateAdminInDB);
// ! Hard Delete Admin From DB route
router.delete('/:id', admin_controller_1.adminControllers.hardDeleteAdmin);
// ! Soft Delete Admin From DB route
router.patch('/soft/:id', admin_controller_1.adminControllers.softDeleteAdmin);
exports.adminRoutes = router;
