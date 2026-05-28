"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const borrow_model_1 = require("../models/borrow.model");
const borrow_repository_1 = __importDefault(require("../repositories/borrow.repository"));
class BorrowingService {
    static async borrowBook(memberId, bookId, borrowDate, dueDays = 7, returnDate = null, status = "Borrowed") {
        const activeBorrowing = await borrow_repository_1.default.findActiveByBookId(bookId);
        if (activeBorrowing) {
            throw new Error("Book already borrowed");
        }
        const borrowingData = borrow_model_1.BorrowingEntity.createNew(memberId, bookId, borrowDate, dueDays, returnDate, status);
        const borrowing = await borrow_repository_1.default.create(borrowingData);
        return borrowing.toJSON();
    }
    static async returnBook(id) {
        const borrowing = await borrow_repository_1.default.findById(id);
        if (!borrowing) {
            throw new Error("Borrowing not found");
        }
        if (borrowing.isReturned()) {
            throw new Error("Already returned");
        }
        borrowing.markReturned();
        await borrow_repository_1.default.returnBook(id);
        return { message: "Book returned successfully" };
    }
    static async getBorrowingById(id) {
        const borrowing = await borrow_repository_1.default.findById(id);
        if (!borrowing) {
            throw new Error("Not found");
        }
        if (borrowing.isOverdue()) {
            borrowing.markLate();
            await borrow_repository_1.default.markLate(id);
        }
        return borrowing.toJSON();
    }
}
exports.default = BorrowingService;
