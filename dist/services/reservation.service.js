"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_repository_1 = __importDefault(require("../repositories/reservation.repository"));
const reservation_model_1 = require("../models/reservation.model");
class ReservationService {
    static async createReservation(memberId, bookId, reservationDate) {
        const existing = await reservation_repository_1.default.findActiveByBookAndMember(bookId, memberId);
        if (existing) {
            throw new Error("Active reservation already exists for this member and book");
        }
        const data = reservation_model_1.ReservationEntity.createNew(memberId, bookId, reservationDate);
        const reservation = await reservation_repository_1.default.create(data);
        return reservation.toJSON();
    }
    static async getReservationById(id) {
        const reservation = await reservation_repository_1.default.findById(id);
        if (!reservation)
            throw new Error("Reservation not found");
        return reservation.toJSON();
    }
}
exports.default = ReservationService;
