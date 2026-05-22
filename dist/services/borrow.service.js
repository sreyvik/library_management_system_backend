"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const borrow_model_1 = require("../models/borrow.model");
const borrow_repository_1 = __importDefault(require("../repositories/borrow.repository"));
class BorrowingService {
    static borrowBook(memberId_1, bookId_1, borrowDate_1) {
        return __awaiter(this, arguments, void 0, function* (memberId, bookId, borrowDate, dueDays = 7, returnDate = null, status = "Borrowed") {
            const activeBorrowing = yield borrow_repository_1.default.findActiveByBookId(bookId);
            if (activeBorrowing) {
                throw new Error("Book already borrowed");
            }
            const borrowingData = borrow_model_1.BorrowingEntity.createNew(memberId, bookId, borrowDate, dueDays, returnDate, status);
            const borrowing = yield borrow_repository_1.default.create(borrowingData);
            return borrowing.toJSON();
        });
    }
    static returnBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const borrowing = yield borrow_repository_1.default.findById(id);
            if (!borrowing) {
                throw new Error("Borrowing not found");
            }
            if (borrowing.isReturned()) {
                throw new Error("Already returned");
            }
            borrowing.markReturned();
            yield borrow_repository_1.default.returnBook(id);
            return { message: "Book returned successfully" };
        });
    }
    static getBorrowingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const borrowing = yield borrow_repository_1.default.findById(id);
            if (!borrowing) {
                throw new Error("Not found");
            }
            if (borrowing.isOverdue()) {
                borrowing.markLate();
                yield borrow_repository_1.default.markLate(id);
            }
            return borrowing.toJSON();
        });
    }
}
exports.default = BorrowingService;
