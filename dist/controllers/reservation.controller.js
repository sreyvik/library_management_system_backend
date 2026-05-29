"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../utils/validation");
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
            const id = (0, validation_1.parseId)(req.params.id);
            if (id === null) {
                res.status(400).json({ success: false, message: "invalid reservation id" });
                return;
            }
            const result = await reservation_service_1.default.getReservationById(id);
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
    static async updateReservation(req, res) {
        try {
            const id = (0, validation_1.parseId)(req.params.id);
            if (id === null) {
                res.status(400).json({ success: false, message: "invalid reservation id" });
                return;
            }
            const { memberId, bookId, reservationDate, status } = req.body;
            const result = await reservation_service_1.default.updateReservation(id, memberId, bookId, reservationDate, status);
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to update reservation");
        }
    }
    static async deleteReservation(req, res) {
        try {
            const id = (0, validation_1.parseId)(req.params.id);
            if (id === null) {
                res.status(400).json({ success: false, message: "invalid reservation id" });
                return;
            }
            const result = await reservation_service_1.default.deleteReservation(id);
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to delete reservation");
        }
    }
    static async deleteAllReservations(req, res) {
        try {
            const result = await reservation_service_1.default.deleteAllReservations();
            res.status(200).json(result);
        }
        catch (error) {
            ReservationController.sendError(res, error, "Failed to delete all reservations");
        }
    }
}
exports.default = ReservationController;
