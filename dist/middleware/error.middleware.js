"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    if (err?.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON body. Make sure you send valid JSON (no extra quotes, include commas).",
            requiredFields: ["name", "email", "password"],
        });
    }
    if (err?.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
            success: false,
            message: "Duplicate record",
        });
    }
    console.error(err?.message ?? err);
    const statusCode = err?.statusCode || err?.status || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Server Error",
    });
};
exports.errorMiddleware = errorMiddleware;
