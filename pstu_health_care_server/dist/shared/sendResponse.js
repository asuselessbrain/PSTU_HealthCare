"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, json) => {
    res.status(json === null || json === void 0 ? void 0 : json.statusCode).json({
        success: true,
        message: json === null || json === void 0 ? void 0 : json.message,
        meta: json === null || json === void 0 ? void 0 : json.meta,
        data: json === null || json === void 0 ? void 0 : json.data
    });
};
exports.default = sendResponse;
