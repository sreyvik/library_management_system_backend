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
