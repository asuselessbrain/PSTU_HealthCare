"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandlerer_1 = __importDefault(require("./app/middleWares/globalErrorHandlerer"));
const notFound_1 = __importDefault(require("./app/middleWares/notFound"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send({ "message": "Server is running!" });
});
app.use(globalErrorHandlerer_1.default);
app.use(notFound_1.default);
exports.default = app;
