import db from "../configs/db";
import {
  BorrowingEntity,
  BorrowingRow,
  CreateBorrowingData,
} from "../models/borrow.model";

interface InsertResult {
  insertId: number;
}

export default class BorrowingRepository {
  static async create(data: CreateBorrowingData): Promise<BorrowingEntity> {
    const [result] = await db.query(
      `INSERT INTO borrowings (member_id, book_id, borrow_date, due_date, return_date, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.memberId,
        data.bookId,
        data.borrowDate,
        data.dueDate,
        data.returnDate,
        data.status,
      ]
    );

    return BorrowingEntity.fromCreateResult((result as InsertResult).insertId, data);
  }

  static async findById(id: number): Promise<BorrowingEntity | null> {
    const [rows] = await db.query(`SELECT * FROM borrowings WHERE id = ?`, [id]);
    const [row] = rows as BorrowingRow[];

    return row ? BorrowingEntity.fromRow(row) : null;
  }

  static async findActiveByBookId(bookId: number): Promise<BorrowingEntity | null> {
    const [rows] = await db.query(
      `SELECT * FROM borrowings
       WHERE book_id = ? AND status != 'Returned'`,
      [bookId]
    );
    const [row] = rows as BorrowingRow[];

    return row ? BorrowingEntity.fromRow(row) : null;
  }

  static async returnBook(id: number): Promise<void> {
    await db.query(
      `UPDATE borrowings
       SET return_date = NOW(), status = 'Returned'
       WHERE id = ?`,
      [id]
    );
  }

  static async markLate(id: number): Promise<void> {
    await db.query(`UPDATE borrowings SET status = 'Late' WHERE id = ?`, [id]);
  }
}
