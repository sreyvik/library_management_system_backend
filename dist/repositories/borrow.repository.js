"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../configs/db"));
const borrow_model_1 = require("../models/borrow.model");
class BorrowingRepository {
    static async create(data) {
        const [result] = await db_1.default.query(`INSERT INTO borrowings (member_id, book_id, borrow_date, due_date, return_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`, [
            data.memberId,
            data.bookId,
            data.borrowDate,
            data.dueDate,
            data.returnDate,
            data.status,
        ]);
        return borrow_model_1.BorrowingEntity.fromCreateResult(result.insertId, data);
    }
    static async findById(id) {
        const [rows] = await db_1.default.query(`SELECT * FROM borrowings WHERE id = ?`, [id]);
        const [row] = rows;
        return row ? borrow_model_1.BorrowingEntity.fromRow(row) : null;
    }
    static async findActiveByBookId(bookId) {
        const [rows] = await db_1.default.query(`SELECT * FROM borrowings
       WHERE book_id = ? AND status != 'Returned'`, [bookId]);
        const [row] = rows;
        return row ? borrow_model_1.BorrowingEntity.fromRow(row) : null;
    }
    static async returnBook(id) {
        await db_1.default.query(`UPDATE borrowings
       SET return_date = NOW(), status = 'Returned'
       WHERE id = ?`, [id]);
    }
    static async markLate(id) {
        await db_1.default.query(`UPDATE borrowings SET status = 'Late' WHERE id = ?`, [id]);
    }
}
exports.default = BorrowingRepository;
