import ReservationRepository from "../repositories/reservation.repository";
import { ReservationEntity } from "../models/reservation.model";

export default class ReservationService {
  static async createReservation(memberId: number, bookId: number, reservationDate: string) {
    const existing = await ReservationRepository.findActiveByBookAndMember(bookId, memberId);

    if (existing) {
      throw new Error("Active reservation already exists for this member and book");
    }

    const data = ReservationEntity.createNew(memberId, bookId, reservationDate);
    const reservation = await ReservationRepository.create(data);

    return reservation.toJSON();
  }

  static async getReservationById(id: number) {
    const reservation = await ReservationRepository.findById(id);

    if (!reservation) throw new Error("Reservation not found");

    return reservation.toJSON();
  }
}
