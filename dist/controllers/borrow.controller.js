"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("./base.controller"));
const borrow_service_1 = __importDefault(require("../services/borrow.service"));
class BorrowingsController extends base_controller_1.default {
    static async borrowBook(req, res) {
        try {
            const { memberId, bookId, borrowDate, dueDays, returnDate, status } = req.body;
            const result = await borrow_service_1.default.borrowBook(memberId, bookId, borrowDate, dueDays, returnDate, status);
            res.status(201).json(result);
        }
        catch (error) {
            BorrowingsController.sendError(res, error, "Failed to borrow book");
        }
    }
    static async returnBook(req, res) {
        try {
            const result = await borrow_service_1.default.returnBook(Number(req.params.id));
            res.status(200).json(result);
        }
        catch (error) {
            BorrowingsController.sendError(res, error, "Failed to return book");
        }
    }
    static async getBorrowing(req, res) {
        try {
            const result = await borrow_service_1.default.getBorrowingById(Number(req.params.id));
            res.status(200).json(result);
        }
        catch (error) {
            BorrowingsController.sendError(res, error, "Failed to fetch borrowing");
        }
    }
}
exports.default = BorrowingsController;
