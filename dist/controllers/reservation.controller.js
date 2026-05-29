"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("./base.controller"));
const reservation_service_1 = __importDefault(require("../services/reservation.service"));
class ReservationController extends base_controller_1.default {
    static async createReservation(req, res) {
        try {
            const { memberId, bookId, reservationDate } = req.body;
            const result = await reservation_service_1.default.createReservation(memberId, bookId, reservationDate);
            res.status(201).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to create reservation");
        }
    }
    static async getReservation(req, res) {
        try {
            const result = await reservation_service_1.default.getReservationById(Number(req.params.id));
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to fetch reservation");
        }
    }
    static async listReservations(req, res) {
        try {
            const result = await reservation_service_1.default.listReservations();
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to list reservations");
        }
    }
}
exports.default = ReservationController;
