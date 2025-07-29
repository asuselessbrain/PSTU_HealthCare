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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const index_d_1 = require("./../../../../generated/prisma/index.d");
const prisma_1 = require("../../../../generated/prisma");
const paginationHealper_1 = __importDefault(require("../../../healper/paginationHealper"));
const admin_constant_1 = require("./admin.constant");
const prisma = new prisma_1.PrismaClient();
// ! Get All Admin From DB
const getAllAdminFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { page, skip, take, sortBy, sortOrder } = (0, paginationHealper_1.default)(options);
    let searchItems = [];
    if (params.searchTerm) {
        searchItems.push({
            OR: admin_constant_1.searchFields.map(item => ({
                [item]: {
                    contains: params.searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        searchItems.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    const whereIncludeSearch = { AND: searchItems };
    const result = yield prisma.admin.findMany({
        where: whereIncludeSearch,
        skip,
        take,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = yield prisma.admin.count({
        where: whereIncludeSearch
    });
    return {
        meta: {
            page,
            limit: take,
            total
        },
        result
    };
});
// ! Get Single Admin From DB using id
const getSingleAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.admin.findUnique({
        where: {
            id
        }
    });
    return result;
});
// ! Update Admin Into DB
const updateAdminInDB = (id, adminInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.admin.update({
        where: {
            id
        },
        data: Object.assign({}, adminInfo)
    });
    return result;
});
// ! Hard Delete Admin From DB
const hardDeleteAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteAdmin = yield transactionClient.admin.delete({
            where: {
                id
            }
        });
        yield transactionClient.user.delete({
            where: {
                email: deleteAdmin.email
            }
        });
        return deleteAdmin;
    }));
    return result;
});
// ! Soft Delete Admin From DB
const softDeleteAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteAdmin = yield transactionClient.admin.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        });
        yield transactionClient.user.update({
            where: {
                email: deleteAdmin.email
            },
            data: {
                status: index_d_1.UserStatus.DELETED
            }
        });
        return deleteAdmin;
    }));
    return result;
});
exports.adminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateAdminInDB,
    hardDeleteAdminFromDB,
    softDeleteAdminFromDB
};
