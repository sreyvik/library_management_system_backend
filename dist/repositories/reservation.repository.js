import db from "../configs/db.js";
import { ReservationEntity } from "../models/reservation.model.js";
export default class ReservationRepository {
    static async create(data) {
        const [result] = await db.query(`INSERT INTO reservations (member_id, book_id, reservation_date, status) VALUES (?, ?, ?, ?)`, [data.memberId, data.bookId, data.reservationDate, data.status]);
        return ReservationEntity.fromCreateResult(result.insertId, data);
    }
    static async update(id, data) {
        const [result] = await db.query(`UPDATE reservations SET member_id = ?, book_id = ?, reservation_date = ?, status = ? WHERE id = ?`, [data.memberId, data.bookId, data.reservationDate, data.status, id]);
        const affectedRows = result.affectedRows;
        if (affectedRows === 0) {
            throw new Error("Reservation not found");
        }
        const updated = await this.findById(id);
        if (!updated) {
            throw new Error("Reservation not found after update");
        }
        return updated;
    }
    static async deleteById(id) {
        const [result] = await db.query(`DELETE FROM reservations WHERE id = ?`, [id]);
        const affectedRows = result.affectedRows;
        return affectedRows > 0;
    }
    static async deleteAll() {
        const [result] = await db.query(`DELETE FROM reservations`);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }
    static async findById(id) {
        const [rows] = await db.query(`SELECT * FROM reservations WHERE id = ?`, [id]);
        const [row] = rows;
        return row ? ReservationEntity.fromRow(row) : null;
    }
    static async findActiveByBookAndMember(bookId, memberId) {
        const [rows] = await db.query(`SELECT * FROM reservations WHERE book_id = ? AND member_id = ? AND status = 'Active'`, [bookId, memberId]);
        const [row] = rows;
        return row ? ReservationEntity.fromRow(row) : null;
    }
    static async findAll() {
        const [rows] = await db.query(`SELECT * FROM reservations`);
        return rows.map(row => ReservationEntity.fromRow(row));
    }
}
