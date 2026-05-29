import db from "../configs/db";
import { ReservationEntity, ReservationRow, CreateReservationData } from "../models/reservation.model";

interface InsertResult { insertId: number }

export default class ReservationRepository {
  static async create(data: CreateReservationData): Promise<ReservationEntity> {
    const [result] = await db.query(
      `INSERT INTO reservations (member_id, book_id, reservation_date, status) VALUES (?, ?, ?, ?)`,
      [data.memberId, data.bookId, data.reservationDate, data.status]
    );

    return ReservationEntity.fromCreateResult((result as InsertResult).insertId, data);
  }

  static async findById(id: number): Promise<ReservationEntity | null> {
    const [rows] = await db.query(`SELECT * FROM reservations WHERE id = ?`, [id]);
    const [row] = rows as ReservationRow[];
    return row ? ReservationEntity.fromRow(row) : null;
  }

  static async findActiveByBookAndMember(bookId: number, memberId: number): Promise<ReservationEntity | null> {
    const [rows] = await db.query(`SELECT * FROM reservations WHERE book_id = ? AND member_id = ? AND status = 'Active'`, [bookId, memberId]);
    const [row] = rows as ReservationRow[];
    return row ? ReservationEntity.fromRow(row) : null;
  }

  static async findAll(): Promise<ReservationEntity[]> {
    const [rows] = await db.query(`SELECT * FROM reservations`);
    return (rows as ReservationRow[]).map(row => ReservationEntity.fromRow(row));
  }
}
