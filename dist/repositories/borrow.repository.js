import db from "../configs/db.js";
import { BorrowingEntity, } from "../models/borrow.model.js";
export default class BorrowingRepository {
    static async create(data) {
        const [result] = await db.query(`INSERT INTO borrowings (member_id, book_id, borrow_date, due_date, return_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`, [
            data.memberId,
            data.bookId,
            data.borrowDate,
            data.dueDate,
            data.returnDate,
            data.status,
        ]);
        return BorrowingEntity.fromCreateResult(result.insertId, data);
    }
    static async findById(id) {
        const [rows] = await db.query(`SELECT * FROM borrowings WHERE id = ?`, [id]);
        const [row] = rows;
        return row ? BorrowingEntity.fromRow(row) : null;
    }
    static async findActiveByBookId(bookId) {
        const [rows] = await db.query(`SELECT * FROM borrowings
       WHERE book_id = ? AND status != 'Returned'`, [bookId]);
        const [row] = rows;
        return row ? BorrowingEntity.fromRow(row) : null;
    }
    static async returnBook(id) {
        await db.query(`UPDATE borrowings
       SET return_date = NOW(), status = 'Returned'
       WHERE id = ?`, [id]);
    }
    static async markLate(id) {
        await db.query(`UPDATE borrowings SET status = 'Late' WHERE id = ?`, [id]);
    }
}
