"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    successResponse(res, message, data = null, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    errorResponse(res, error, statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
    asyncHandler(fn) {
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        };
    }
}
exports.BaseController = BaseController;
