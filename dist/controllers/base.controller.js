"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
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
=======
class BaseController {
    static sendError(res, error, fallbackMessage = "Request failed") {
        const message = error instanceof Error ? error.message : fallbackMessage;
        const statusCode = this.resolveStatusCode(message);
        res.status(statusCode).json({ message });
    }
    static resolveStatusCode(message) {
        switch (message) {
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
}
exports.default = BaseController;
>>>>>>> feat/develop
