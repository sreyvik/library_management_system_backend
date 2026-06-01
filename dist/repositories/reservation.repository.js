"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../configs/db"));
const reservation_model_1 = require("../models/reservation.model");
class ReservationRepository {
    static async create(data) {
        const [result] = await db_1.default.query(`INSERT INTO reservations (member_id, book_id, reservation_date, status) VALUES (?, ?, ?, ?)`, [data.memberId, data.bookId, data.reservationDate, data.status]);
        return reservation_model_1.ReservationEntity.fromCreateResult(result.insertId, data);
    }
    static async update(id, data) {
        const [result] = await db_1.default.query(`UPDATE reservations SET member_id = ?, book_id = ?, reservation_date = ?, status = ? WHERE id = ?`, [data.memberId, data.bookId, data.reservationDate, data.status, id]);
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
        const [result] = await db_1.default.query(`DELETE FROM reservations WHERE id = ?`, [id]);
        const affectedRows = result.affectedRows;
        return affectedRows > 0;
    }
    static async deleteAll() {
        const [result] = await db_1.default.query(`DELETE FROM reservations`);
        const affectedRows = result.affectedRows;
        return affectedRows;
    }
    static async findById(id) {
        const [rows] = await db_1.default.query(`SELECT * FROM reservations WHERE id = ?`, [id]);
        const [row] = rows;
        return row ? reservation_model_1.ReservationEntity.fromRow(row) : null;
    }
    static async findActiveByBookAndMember(bookId, memberId) {
        const [rows] = await db_1.default.query(`SELECT * FROM reservations WHERE book_id = ? AND member_id = ? AND status = 'Active'`, [bookId, memberId]);
        const [row] = rows;
        return row ? reservation_model_1.ReservationEntity.fromRow(row) : null;
    }
    static async findAll() {
        const [rows] = await db_1.default.query(`SELECT * FROM reservations`);
        return rows.map(row => reservation_model_1.ReservationEntity.fromRow(row));
    }
}
exports.default = ReservationRepository;
