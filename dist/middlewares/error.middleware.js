"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = error?.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: error?.message || "Internal server error",
    });
};
exports.errorHandler = errorHandler;
