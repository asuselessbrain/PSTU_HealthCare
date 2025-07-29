"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminControllers = void 0;
const admin_services_1 = require("./admin.services");
const pickFunction_1 = __importDefault(require("../../../shared/pickFunction"));
const admin_constant_1 = require("./admin.constant");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// ! Get All Admin From DB Controller
const getAllAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = (0, pickFunction_1.default)(req === null || req === void 0 ? void 0 : req.query, admin_constant_1.filterFieldArray);
        const options = (0, pickFunction_1.default)(req === null || req === void 0 ? void 0 : req.query, admin_constant_1.paginationAndSortingFields);
        const result = yield admin_services_1.adminServices.getAllAdminFromDB(filter, options);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            message: "Admin retrieved successfully!",
            meta: result.meta,
            data: result.result
        });
    }
    catch (err) {
        next(err);
    }
});
// ! Get Single Admin From DB using id Controller
const getSingleAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield admin_services_1.adminServices.getSingleAdminFromDB(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            message: "Specific admin retrieve successfully!",
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
// ! Update Admin Into DB Controller
const updateAdminInDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield admin_services_1.adminServices.updateAdminInDB(id, req.body);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            message: "Admin Updated Successfully",
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
// ! Hard Delete Admin From DB Controller
const hardDeleteAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_services_1.adminServices.hardDeleteAdminFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Admin deleted successfully!",
        data: null
    });
});
// ! Soft Delete Admin From DB Controller
const softDeleteAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield admin_services_1.adminServices.softDeleteAdminFromDB(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            message: "Admin deleted Successfully",
            data: null
        });
    }
    catch (err) {
        next(err);
    }
});
exports.adminControllers = {
    getAllAdmin,
    getSingleAdmin,
    updateAdminInDB,
    hardDeleteAdmin,
    softDeleteAdmin
};
