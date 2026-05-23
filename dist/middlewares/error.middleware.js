"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500;
    res.status(statusCode).json({
        success: false,
        message: (error === null || error === void 0 ? void 0 : error.message) || "Internal server error"
    });
};
exports.errorHandler = errorHandler;
