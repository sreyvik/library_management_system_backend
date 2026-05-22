"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
