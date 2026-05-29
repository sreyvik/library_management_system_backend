"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_repository_1 = __importDefault(require("../repositories/reservation.repository"));
const reservation_model_1 = require("../models/reservation.model");
const validation_1 = require("../utils/validation");
class ReservationService {
    static async createReservation(memberId, bookId, reservationDate) {
        // Validate required fields
        (0, validation_1.validateRequiredField)(memberId, "memberId");
        (0, validation_1.validateRequiredField)(bookId, "bookId");
        (0, validation_1.validateRequiredField)(reservationDate, "reservationDate");
        // Validate that memberId and bookId are numbers
        (0, validation_1.validateNumber)(memberId, "memberId");
        (0, validation_1.validateNumber)(bookId, "bookId");
        const existing = await reservation_repository_1.default.findActiveByBookAndMember(bookId, memberId);
        if (existing) {
            throw new Error("Active reservation already exists for this member and book");
        }
        const data = reservation_model_1.ReservationEntity.createNew(memberId, bookId, reservationDate);
        const reservation = await reservation_repository_1.default.create(data);
        return reservation.toJSON();
    }
    static async updateReservation(id, memberId, bookId, reservationDate, status) {
        // Validate required fields
        (0, validation_1.validateRequiredField)(memberId, "memberId");
        (0, validation_1.validateRequiredField)(bookId, "bookId");
        (0, validation_1.validateRequiredField)(reservationDate, "reservationDate");
        // Validate that memberId and bookId are numbers
        (0, validation_1.validateNumber)(memberId, "memberId");
        (0, validation_1.validateNumber)(bookId, "bookId");
        // Use default status if not provided
        const statusToUse = status ?? "Active";
        // Validate status
        const validStatuses = ["Active", "Cancelled", "Fulfilled"];
        if (!validStatuses.includes(statusToUse)) {
            throw new Error(`Invalid reservation status: ${statusToUse}`);
        }
        const data = reservation_model_1.ReservationEntity.createNew(memberId, bookId, reservationDate, statusToUse);
        const reservation = await reservation_repository_1.default.update(id, data);
        return reservation.toJSON();
    }
    static async deleteReservation(id) {
        // Validate ID
        (0, validation_1.validateRequiredField)(id, "id");
        (0, validation_1.validateNumber)(id, "id");
        const deleted = await reservation_repository_1.default.deleteById(id);
        if (!deleted) {
            throw new Error("Reservation not found");
        }
        return { success: true, message: "Reservation deleted" };
    }
    static async deleteAllReservations() {
        const count = await reservation_repository_1.default.deleteAll();
        return { success: true, message: `Deleted ${count} reservations` };
    }
    static async getReservationById(id) {
        const reservation = await reservation_repository_1.default.findById(id);
        if (!reservation)
            throw new Error("Reservation not found");
        return reservation.toJSON();
    }
    static async listReservations() {
        const reservations = await reservation_repository_1.default.findAll();
        return reservations.map(r => r.toJSON());
    }
}
exports.default = ReservationService;
