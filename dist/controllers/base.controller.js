"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    static sendError(res, error, fallbackMessage = "Request failed") {
        const message = error instanceof Error ? error.message : fallbackMessage;
        const statusCode = this.resolveStatusCode(message);
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
    static resolveStatusCode(message) {
        switch (message) {
            case "Email already exists":
                return 409;
            case "Invalid credentials":
            case "Unauthorized":
            case "Invalid token":
                return 401;
            case "Book already borrowed":
                return 409;
            case "Borrowing not found":
            case "Not found":
                return 404;
            case "Already returned":
            case "Invalid borrow date":
            case "Invalid borrowDate":
                return 400;
            default:
                return 400;
        }
    }
    asyncHandler(handler) {
        return async (req, res, next) => {
            try {
                await handler(req, res, next);
            }
            catch (error) {
                next(error);
            }
        };
    }
    successResponse(res, message, data, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
}
exports.BaseController = BaseController;
exports.default = BaseController;
