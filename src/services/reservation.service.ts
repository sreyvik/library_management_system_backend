import ReservationRepository from "../repositories/reservation.repository.js";
import { ReservationEntity, ReservationStatus } from "../models/reservation.model.js";
import { validateRequiredField, validateNumber } from "../utils/validation.js";

export default class ReservationService {
  static async createReservation(memberId: number, bookId: number, reservationDate: string) {
    // Validate required fields
    validateRequiredField(memberId, "memberId");
    validateRequiredField(bookId, "bookId");
    validateRequiredField(reservationDate, "reservationDate");
    
    // Validate that memberId and bookId are numbers
    validateNumber(memberId, "memberId");
    validateNumber(bookId, "bookId");

    const existing = await ReservationRepository.findActiveByBookAndMember(bookId, memberId);

    if (existing) {
      throw new Error("Active reservation already exists for this member and book");
    }

    const data = ReservationEntity.createNew(memberId, bookId, reservationDate);
    const reservation = await ReservationRepository.create(data);

    return reservation.toJSON();
  }

  static async updateReservation(id: number, memberId: number, bookId: number, reservationDate: string, status?: ReservationStatus) {
    // Validate required fields
    validateRequiredField(memberId, "memberId");
    validateRequiredField(bookId, "bookId");
    validateRequiredField(reservationDate, "reservationDate");
    
    // Validate that memberId and bookId are numbers
    validateNumber(memberId, "memberId");
    validateNumber(bookId, "bookId");

    // Use default status if not provided
    const statusToUse = status ?? "Active";
    
    // Validate status
    const validStatuses: ReservationStatus[] = ["Active", "Cancelled", "Fulfilled"];
    if (!validStatuses.includes(statusToUse)) {
      throw new Error(`Invalid reservation status: ${statusToUse}`);
    }

    const data = ReservationEntity.createNew(memberId, bookId, reservationDate, statusToUse);
    const reservation = await ReservationRepository.update(id, data);
    return reservation.toJSON();
  }

  static async deleteReservation(id: number) {
    // Validate ID
    validateRequiredField(id, "id");
    validateNumber(id, "id");

    const deleted = await ReservationRepository.deleteById(id);
    if (!deleted) {
      throw new Error("Reservation not found");
    }
    return { success: true, message: "Reservation deleted" };
  }

  static async deleteAllReservations() {
    const count = await ReservationRepository.deleteAll();
    return { success: true, message: `Deleted ${count} reservations` };
  }

  static async getReservationById(id: number) {
    const reservation = await ReservationRepository.findById(id);

    if (!reservation) throw new Error("Reservation not found");

    return reservation.toJSON();
  }

  static async listReservations() {
    const reservations = await ReservationRepository.findAll();
    return reservations.map(r => r.toJSON());
  }
}