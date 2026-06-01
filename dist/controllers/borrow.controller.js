import BaseController from "./base.controller.js";
import BorrowingService from "../services/borrow.service.js";
export default class BorrowingsController extends BaseController {
    static async borrowBook(req, res) {
        try {
            const { memberId, bookId, borrowDate, dueDays, returnDate, status } = req.body;
            const result = await BorrowingService.borrowBook(memberId, bookId, borrowDate, dueDays, returnDate, status);
            res.status(201).json(result);
        }
        catch (error) {
            BorrowingsController.sendError(res, error, "Failed to borrow book");
        }
    }
    static async returnBook(req, res) {
        try {
            const result = await BorrowingService.returnBook(Number(req.params.id));
            res.status(200).json(result);
        }
        catch (error) {
            BorrowingsController.sendError(res, error, "Failed to return book");
        }
    }
    static async getBorrowing(req, res) {
        try {
            const result = await BorrowingService.getBorrowingById(Number(req.params.id));
            res.status(200).json(result);
        }
        catch (error) {
            BorrowingsController.sendError(res, error, "Failed to fetch borrowing");
        }
    }
}
