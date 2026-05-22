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
const db_1 = __importDefault(require("../configs/db"));
const borrow_model_1 = require("../models/borrow.model");
class BorrowingRepository {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.default.query(`INSERT INTO borrowings (member_id, book_id, borrow_date, due_date, return_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`, [
                data.memberId,
                data.bookId,
                data.borrowDate,
                data.dueDate,
                data.returnDate,
                data.status,
            ]);
            return borrow_model_1.BorrowingEntity.fromCreateResult(result.insertId, data);
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db_1.default.query(`SELECT * FROM borrowings WHERE id = ?`, [id]);
            const [row] = rows;
            return row ? borrow_model_1.BorrowingEntity.fromRow(row) : null;
        });
    }
    static findActiveByBookId(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db_1.default.query(`SELECT * FROM borrowings
       WHERE book_id = ? AND status != 'Returned'`, [bookId]);
            const [row] = rows;
            return row ? borrow_model_1.BorrowingEntity.fromRow(row) : null;
        });
    }
    static returnBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`UPDATE borrowings
       SET return_date = NOW(), status = 'Returned'
       WHERE id = ?`, [id]);
        });
    }
    static markLate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query(`UPDATE borrowings SET status = 'Late' WHERE id = ?`, [id]);
        });
    }
}
exports.default = BorrowingRepository;
